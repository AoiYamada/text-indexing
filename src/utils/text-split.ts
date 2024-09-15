function textSplit(text: string): string[] {
  const trimmedText = text.trim();
  const sentences: string[] = [];
  let start = 0;
  let end = 0;
  let inSentence = false;

  for (let i = 0; i < trimmedText.length; i++) {
    if (
      !inSentence &&
      trimmedText[i] !== " " &&
      trimmedText[i] !== "\t" &&
      trimmedText[i] !== "\n"
    ) {
      inSentence = true;
      start = i;
    }

    if (
      trimmedText[i] === "." ||
      trimmedText[i] === "!" ||
      trimmedText[i] === "?"
    ) {
      end = i + 1;
      sentences.push(trimmedText.slice(start, end).trim());

      inSentence = false;
    }
  }

  return sentences;
}

export default textSplit;
