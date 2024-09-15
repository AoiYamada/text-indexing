import textSplit from "../text-split";

describe("textSplit", () => {
  test("should split text into sentences", () => {
    const text = "Hello world. This is a test. Let's see how it works!";
    const result = textSplit(text);
    expect(result).toEqual([
      "Hello world.",
      "This is a test.",
      "Let's see how it works!",
    ]);
  });

  test("should handle text with multiple spaces and newlines", () => {
    const text = "Hello world.   This is a test.\nLet's see how it works!";
    const result = textSplit(text);
    expect(result).toEqual([
      "Hello world.",
      "This is a test.",
      "Let's see how it works!",
    ]);
  });

  test("should handle text with no punctuation", () => {
    const text = "Hello world This is a test Lets see how it works";
    const result = textSplit(text);
    expect(result).toEqual([]);
  });

  test("should handle empty text", () => {
    const text = "";
    const result = textSplit(text);
    expect(result).toEqual([]);
  });

  test("should handle text with only punctuation", () => {
    const text = "...!!!???";
    const result = textSplit(text);
    expect(result).toEqual([".", ".", ".", "!", "!", "!", "?", "?", "?"]);
  });

  test("should handle text with punctuation at the start", () => {
    const text = ".Hello world. This is a test.";
    const result = textSplit(text);
    expect(result).toEqual([".", "Hello world.", "This is a test."]);
  });

  test("should handle text with punctuation at the end", () => {
    const text = "Hello world. This is a test.";
    const result = textSplit(text);
    expect(result).toEqual(["Hello world.", "This is a test."]);
  });

  test("should handle text with punctuation in the middle of a sentence", () => {
    const text = "Hello world. This is a test. Let's see how it works!";
    const result = textSplit(text);
    expect(result).toEqual([
      "Hello world.",
      "This is a test.",
      "Let's see how it works!",
    ]);
  });
});
