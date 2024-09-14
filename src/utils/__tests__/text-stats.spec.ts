import { textStatsA, textStatsB } from "../text-stats";

describe("textStats functions should produce the same output", () => {
  test("Basic sentences", () => {
    const sampleText =
      "This is a sample text. It contains multiple sentences! Does it work well? Let's find out.";
    const expected = {
      charCount: 89,
      wordCount: 16,
      sentenceCount: 4,
    };

    expect(textStatsA(sampleText)).toEqual(expected);
    expect(textStatsB(sampleText)).toEqual(expected);
  });

  test("Empty text", () => {
    const sampleText = "";
    const expected = {
      charCount: 0,
      wordCount: 0,
      sentenceCount: 0,
    };

    expect(textStatsA(sampleText)).toEqual(expected);
    expect(textStatsB(sampleText)).toEqual(expected);
  });

  test("Single word", () => {
    const sampleText = "Hello";
    const expected = {
      charCount: 5,
      wordCount: 1,
      sentenceCount: 1,
    };

    expect(textStatsA(sampleText)).toEqual(expected);
    expect(textStatsB(sampleText)).toEqual(expected);
  });

  test("Incomplete sentence", () => {
    const sampleText =
      "This is a sample text. It contains multiple sentences. Does it work well. Let's find out. How about this";
    const expected = {
      charCount: 104,
      wordCount: 19,
      sentenceCount: 5,
    };

    expect(textStatsA(sampleText)).toEqual(expected);
    expect(textStatsB(sampleText)).toEqual(expected);
  });

  test("Incomplete sentence with trailing space", () => {
    const sampleText =
      "This is a sample text. It contains multiple sentences. Does it work well. Let's find out. How about this ";
    const expected = {
      charCount: 104,
      wordCount: 19,
      sentenceCount: 5,
    };

    expect(textStatsA(sampleText)).toEqual(expected);
    expect(textStatsB(sampleText)).toEqual(expected);
  });

  test("Incomplete sentence with trailing space and punctuation", () => {
    const sampleText =
      "This is a sample text. It contains multiple sentences. Does it work well. Let's find out. How about this. ";
    const expected = {
      charCount: 105,
      wordCount: 19,
      sentenceCount: 5,
    };

    expect(textStatsA(sampleText)).toEqual(expected);
    expect(textStatsB(sampleText)).toEqual(expected);
  });

  test("Starting with space", () => {
    const sampleText = "  Hello";
    const expected = {
      charCount: 5,
      wordCount: 1,
      sentenceCount: 1,
    };

    expect(textStatsA(sampleText)).toEqual(expected);
    expect(textStatsB(sampleText)).toEqual(expected);
  });
});
