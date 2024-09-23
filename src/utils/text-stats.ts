import { int } from "../types/alias";

type TextStats = {
  totalCharCount: int;
  nonSpaceCharCount: int;
  wordCount: int;
  sentenceCount: int;
  asciiCount: int;
  nonAsciiCount: int;
  spaceCount: int;
};

// twice as fast as textStatsA, it's crucial for large texts
function textStatsB(text: string): TextStats {
  let totalCharCount = 0; // 包含空格的字符數
  let nonSpaceCharCount = 0; // 不包含空格的字符數
  let wordCount = 0;
  let sentenceCount = 0;
  let asciiCount = 0;
  let nonAsciiCount = 0;
  let spaceCount = 0; // 空白字符數量
  let inWord = false;
  let inSentence = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    totalCharCount++; // 每次迴圈都計算總字符數（包括空格）

    // 計算 ASCII 和 non-ASCII 字符
    if (char.charCodeAt(0) <= 127) {
      asciiCount++;
    } else {
      nonAsciiCount++;
    }

    // 處理空白字符：空格、tab、換行
    if (char === " " || char === "\t" || char === "\n") {
      spaceCount++; // 計算空白字符數量
      if (inWord) {
        wordCount++;
        inWord = false;
      }
    } else if (char === "." || char === "!" || char === "?") {
      // 處理句子結尾標點符號
      sentenceCount++;
      nonSpaceCharCount++; // 非空白字符計數
      inSentence = false;

      if (inWord) {
        wordCount++;
        inWord = false;
      }
    } else {
      // 其他情況，表示在句子內部
      if (!inSentence) {
        inSentence = true;
      }

      inWord = true;
      nonSpaceCharCount++; // 非空白字符計數
    }
  }

  // 如果文本以單詞結尾，並且沒有空白字符來結束
  if (inWord) {
    wordCount++;
  }

  // 如果文本以句子結尾，並且沒有標點符號來結束
  if (inSentence) {
    sentenceCount++;
  }

  // 驗證 nonSpaceCharCount 是否等於 totalCharCount - spaceCount
  if (nonSpaceCharCount !== totalCharCount - spaceCount) {
    throw new Error("nonSpaceCharCount 計算有誤");
  }

  return {
    totalCharCount, // 包括空白字符的總字符數
    nonSpaceCharCount, // 不包括空白字符的字符數
    wordCount, // 總單詞數
    sentenceCount, // 總句子數
    asciiCount, // ASCII 字符數
    nonAsciiCount, // 非 ASCII 字符數
    spaceCount, // 空白字符數量
  };
}

const textStats = textStatsB;

export default textStats;

export { textStatsB };
