// src/utils/fetchContentFromUrls.ts
import axios from 'axios';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import fs from 'fs';
import logger from '../logger';

async function fetchHtml(url: string): Promise<string | null> {
  logger.info(`Starting fetch for URL: ${url}`);
  const startTime = Date.now();

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Referer': 'https://www.google.com/',
        'Connection': 'keep-alive'
      },
      maxRedirects: 5,  // Limit the number of redirects to 5
      timeout: 10000 // 設置超時時間為 10 秒
    });
    const endTime = Date.now();
    logger.info(`Finished fetch for URL: ${url} in ${endTime - startTime}ms`);
    return response.data;
  } catch (error) {
    const endTime = Date.now();
    logger.error(`Error fetching URL ${url} after ${endTime - startTime}ms:`, error);
    return null;
  }
}

async function extractContent(url: string): Promise<string | null> {
  const html = await fetchHtml(url);
  if (!html) return null;
  // 移除所有 <style> 標籤
  const cleanedHtml = html.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '');

  // 使用 jsdom 解析 HTML 並創建 DOM 結構
  const dom = new JSDOM(cleanedHtml, { url });

  // 移除所有內聯樣式
  const elementsWithStyle = dom.window.document.querySelectorAll('[style]');
  elementsWithStyle.forEach(element => element.removeAttribute('style'));

  // mozila/readability 用於解析文章內容
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  return article ? article.textContent : null;
}

async function processBatch(batch: any[], writeStream: fs.WriteStream, isFirst: boolean) {
  const promises = batch.map(async (item, index) => {
    if (item.url) {
      let content = await extractContent(item.url);
      // 移除所有換行符和制表符，並將多個空格轉換為單個空格
      if (content) {
        content = content.replace(/[\n\t]+/g, ' ').replace(/\s+/g, ' ');
      }
      const result = { url: item.url, title: item.title, content };

      if (!isFirst || index > 0) {
        writeStream.write(',');
      }

      writeStream.write(JSON.stringify(result, null, 2));
      logger.info(`Extracted content from ${item.url}`);
    }
  });

  await Promise.all(promises);
}

export async function fetchContentsFromUrls(inputFile: string, outputFile: string) {
  const data = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));

  // 清空檔案內容
  fs.writeFileSync(outputFile, '');

  const writeStream = fs.createWriteStream(outputFile);
  writeStream.write('[');

  const batchSize = 5; // 每批次處理的數量
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    await processBatch(batch, writeStream, i === 0);
  }

  writeStream.write(']');
  writeStream.end();
  logger.info(`Data saved to ${outputFile}`);
}
