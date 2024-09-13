import "dotenv/config";
import es from "./elasticsearch";

interface Document {
  character: string;
  quote: string;
}

async function run() {
  // Let's start by indexing some data
  await es.index({
    index: "game-of-thrones",
    document: {
      character: "Ned Stark",
      quote: "Winter is coming.",
    },
  });

  await es.index({
    index: "game-of-thrones",
    document: {
      character: "Daenerys Targaryen",
      quote: "I am the blood of the dragon.",
    },
  });

  await es.index({
    index: "game-of-thrones",
    document: {
      character: "Tyrion Lannister",
      quote: "A mind needs books like a sword needs a whetstone.",
    },
  });

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await es.indices.refresh({ index: "game-of-thrones" });

  // Let's search!
  const result = await es.search<Document>({
    index: "game-of-thrones",
    query: {
      match: { quote: "winter" },
    },
  });

  console.log(result.hits.hits);
}

run().catch(console.log);
