import textStats from "../text-stats";

describe("textStats functions should produce the same output", () => {
  test("Basic sentences", () => {
    const sampleText =
      "This is a sample text. It contains multiple sentences! Does it work well? Let's find out.";
    const expected = {
      totalCharCount: 89,        // 總字符數，包括空白字符
      nonSpaceCharCount: 74,     // 不包括空白字符的字符數
      wordCount: 16,
      sentenceCount: 4,
      asciiCount: 89,            // 所有字符都是 ASCII 字符
      nonAsciiCount: 0,
      spaceCount: 15,            // 空白字符數量
    };

    expect(textStats(sampleText)).toEqual(expected);
  });

  test("Empty text", () => {
    const sampleText = "";
    const expected = {
      totalCharCount: 0,
      nonSpaceCharCount: 0,
      wordCount: 0,
      sentenceCount: 0,
      asciiCount: 0,
      nonAsciiCount: 0,
      spaceCount: 0,
    };

    expect(textStats(sampleText)).toEqual(expected);
  });

  test("Single word", () => {
    const sampleText = "Hello";
    const expected = {
      totalCharCount: 5,
      nonSpaceCharCount: 5,
      wordCount: 1,
      sentenceCount: 1,
      asciiCount: 5,
      nonAsciiCount: 0,
      spaceCount: 0,
    };

    expect(textStats(sampleText)).toEqual(expected);
  });

  test("Incomplete sentence", () => {
    const sampleText =
      "This is a sample text. It contains multiple sentences. Does it work well. Let's find out. How about this";
    const expected = {
      totalCharCount: 104,
      nonSpaceCharCount: 86,
      wordCount: 19,
      sentenceCount: 5,
      asciiCount: 104,
      nonAsciiCount: 0,
      spaceCount: 18,
    };

    expect(textStats(sampleText)).toEqual(expected);
  });

  test("Incomplete sentence with trailing space", () => {
    const sampleText =
      "This is a sample text. It contains multiple sentences. Does it work well. Let's find out. How about this ";
    const expected = {
      totalCharCount: 105,
      nonSpaceCharCount: 86,
      wordCount: 19,
      sentenceCount: 5,
      asciiCount: 105,
      nonAsciiCount: 0,
      spaceCount: 19,
    };

    expect(textStats(sampleText)).toEqual(expected);
  });

  test("Incomplete sentence with trailing space and punctuation", () => {
    const sampleText =
      "This is a sample text. It contains multiple sentences. Does it work well. Let's find out. How about this. ";
    const expected = {
      totalCharCount: 106,
      nonSpaceCharCount: 87,
      wordCount: 19,
      sentenceCount: 5,
      asciiCount: 106,
      nonAsciiCount: 0,
      spaceCount: 19,
    };

    expect(textStats(sampleText)).toEqual(expected);
  });

  test("Starting with space", () => {
    const sampleText = "  Hello";
    const expected = {
      totalCharCount: 7,          // 包括兩個空格和5個字母
      nonSpaceCharCount: 5,       // 只有 "Hello" 這5個字符
      wordCount: 1,
      sentenceCount: 1,
      asciiCount: 7,
      nonAsciiCount: 0,
      spaceCount: 2,              // 前面的兩個空格
    };

    expect(textStats(sampleText)).toEqual(expected);
  });
});
