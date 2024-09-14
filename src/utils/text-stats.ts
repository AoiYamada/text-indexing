type TextStats = {
  charCount: number;
  wordCount: number;
  sentenceCount: number;
};

// naive implementation, because 2 splits are used, each with O(n) complexity
function textStatsA(text: string): TextStats {
  const trimmedText = text.trim();
  const words = trimmedText.split(/\s+/);
  let wordCount = words.length;

  if (words[wordCount - 1] === "") {
    wordCount--;
  }

  if (words.length > 1 && words[0] === "") {
    wordCount--;
  }

  const sentences = trimmedText.split(/[.!?]/);
  let sentenceCount = sentences.length;

  if (sentences[sentenceCount - 1] === "") {
    sentenceCount--;
  }

  if (sentences.length > 1 && sentences[0] === "") {
    sentenceCount--;
  }

  return {
    charCount: trimmedText.length,
    wordCount,
    sentenceCount,
  };
}

// twice as fast as textStatsA, it's crucial for large texts
function textStatsB(text: string): TextStats {
  const trimmedText = text.trim();
  let charCount = 0;
  let wordCount = 0;
  let sentenceCount = 0;
  let inWord = false;
  let inSentence = false;

  for (let i = 0; i < trimmedText.length; i++) {
    charCount++;

    if (
      trimmedText[i] === " " ||
      trimmedText[i] === "\t" ||
      trimmedText[i] === "\n"
    ) {
      if (inWord) {
        wordCount++;
        inWord = false;
      }
    } else if (
      trimmedText[i] === "." ||
      trimmedText[i] === "!" ||
      trimmedText[i] === "?"
    ) {
      sentenceCount++;
      inSentence = false;

      if (inWord) {
        wordCount++;
        inWord = false;
      }
    } else {
      if (!inSentence) {
        inSentence = true;
      }

      inWord = true;
    }
  }

  // If the text ends with a word without trailing space
  if (inWord) {
    wordCount++;
  }

  if (inSentence) {
    sentenceCount++;
  }

  return {
    charCount,
    wordCount,
    sentenceCount,
  };
}

const textStats = textStatsB;

export default textStats;

export { textStatsA, textStatsB };
