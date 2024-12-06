// src/utils/fetchContentFromUrls.ts
import axios from 'axios';
import UserAgent from 'user-agents';
import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import fs from 'fs';
import logger from '../logger';

async function fetchHtml(url: string): Promise<string | null> {
  logger.info(`Starting fetch for URL: ${url}`);
  const userAgent: UserAgent = new UserAgent();
  const startTime = Date.now();

  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent': userAgent.toString(),
        'Referer': 'https://www.google.com/',
        'Connection': 'keep-alive'
      },
      // Limit the number of redirects to 5
      maxRedirects: 5,
      timeout: 10000,
      withCredentials: true
    });
    const endTime = Date.now();
    logger.info(`Finished fetch for URL: ${url} in ${endTime - startTime}ms`);
    return response.data;
  } catch (error) {
    const endTime = Date.now();
    logger.error(`Error fetching URL ${url} after ${endTime - startTime}ms: ${error instanceof Error ? error.message : String(error)}`);
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

interface BatchItem {
  url: string;
  title: string;
}

async function processBatch(batch: BatchItem[], writeStream: fs.WriteStream, isFirst: boolean) {
  const promises = batch.map(async (item, index) => {
    if (item.url) {
      let content = await extractContent(item.url);
      // 移除所有換行符和制表符，並將多個空格轉換為單個空格
      if (content) {
        content = content.replace(/[\n\t]+/g, ' ').replace(/\s+/g, ' ');
      }
      const result = { url: item.url, title: item.title, content };

      writeStream.write(',');

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
  // 等待寫入完成
  writeStream.on('finish', () => {
    // 讀取檔案的第一行
    const fd = fs.openSync(outputFile, 'r+');
    const buffer = Buffer.alloc(1024);
    fs.readSync(fd, buffer, 0, buffer.length, 0);
    let fileContent = buffer.toString('utf-8');
    // 刪除第一個多餘的逗號
    fileContent = fileContent.replace('[,', '[');
    // 寫回檔案的第一行
    fs.writeSync(fd, fileContent, 0, 'utf-8');
    fs.closeSync(fd);
    logger.info(`Data saved to ${outputFile}`);
  });
}
