// src/cmds/fetchGdeltData.ts
// cspell:ignore cmds Gdelt spacex gdelt maxrecords STARTDATETIME ENDDATETIME
import axios from "axios";
import fs from "fs";
import { format, addHours, isBefore, parse, addDays } from "date-fns";
import { Command } from "commander";
import logger from "../../logger";
import { fetchContentsFromUrls } from "../../utils/fetchContentFromUrls";

const BASE_URL = "https://api.gdeltproject.org/api/v2/doc/doc";
const MODE = "ArtList";
const MAX_RECORDS = 250;
const FORMAT = "json";
const OUTPUT_FILE = `${process.cwd()}/data-source/gdelt_data.json`;
const EXTRACTED_OUTPUT_FILE = `${process.cwd()}/data-source/extracted_content.json`;

async function fetchGdeltData(
  query: string,
  startDateTime: string,
  endDateTime: string
) {
  try {
    // 只搜尋英文新聞
    query = query.concat(" sourcelang:eng");
    const response = await axios.get(BASE_URL, {
      params: {
        query,
        mode: MODE,
        maxrecords: MAX_RECORDS,
        format: FORMAT,
        STARTDATETIME: startDateTime,
        ENDDATETIME: endDateTime,
      },
    });

    return response.data;
  } catch (error) {
    logger.error("Error fetching data:", error);
    return null;
  }
}

async function main(
  query: string,
  startDate: string,
  endDate: string,
  ignore: boolean
) {
  if (!ignore) {
    const start = parse(startDate, "yyyyMMdd", new Date());
    const end = parse(endDate, "yyyyMMdd", new Date());

    let current = start;
    let totalArticles = 0;
    // 清空文件
    fs.writeFileSync(OUTPUT_FILE, "");
    // 迴圈直到 current 大於 end
    while (isBefore(current, addDays(end, 1))) {
      const next = addHours(current, 1);
      const data = await fetchGdeltData(
        query,
        format(current, "yyyyMMddHHmmss"),
        format(next, "yyyyMMddHHmmss")
      );
      totalArticles += data.articles.length;
      // 檢查 data 的原始類型
      console.log(
        "Data Type:",
        typeof data,
        ", Number of articles:",
        data.articles.length
      );
      // console.log(data);

      if (data && Array.isArray(data.articles)) {
        data.articles.forEach((item: Record<string, string>) => {
          fs.appendFileSync(OUTPUT_FILE, JSON.stringify(item, null, 2) + ",\n");
        });
      } else {
        logger.error(
          "Unexpected data format. Expected an object with an 'articles' array:",
          data
        );
      }

      current = next;
      // 每次間隔固定秒數避免API限制
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    // Remove the trailing comma and add the closing brackets
    const correctedData = fs
      .readFileSync(OUTPUT_FILE, "utf8")
      .replace(/,\s*$/, "");
    fs.writeFileSync(OUTPUT_FILE, `[${correctedData}]`);
    logger.info(
      `Data saved to ${OUTPUT_FILE}, total articles: ${totalArticles}`
    );
  } else {
    if (fs.existsSync(OUTPUT_FILE)) {
      logger.info(`Ignoring API fetch, using existing file: ${OUTPUT_FILE}`);
    } else {
      logger.error(`Error: ${OUTPUT_FILE} does not exist. Cannot ignore API fetch.`);
      process.exit(1);
    }
  }

  // 執行擷取新聞內文的功能
  await fetchContentsFromUrls(OUTPUT_FILE, EXTRACTED_OUTPUT_FILE);
}

const fetchCmd = new Command("fetch-gdelt")
  .description("Fetch GDELT data")
  .option("--ignore", "Ignore API fetch and use existing file")
  .option("-q, --query <query>", "Search query")
  .option("-s, --start <start>", "Start date in format YYYYMMDD")
  .option("-e, --end <end>", "End date in format YYYYMMDD")
  .action((cmd) => {
    const { query, start, end, ignore } = cmd;
    if (ignore) {
      main("", "", "", true);
    } else {
      if (!query || !start || !end) {
        console.error("Error: query, start, and end options are required unless --ignore is specified.");
        process.exit(1);
      }
      main(query, start, end, false);
    }
  });

export default fetchCmd;
