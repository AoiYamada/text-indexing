import "dotenv/config";
import es from "./elasticsearch";
import docIndex from "./elasticsearch/indices/doc";
import docMappings from "./elasticsearch/indices/doc/mappings";

interface Document {
  doc_type: string;
  sentences: {
    content: string;
  }[];
}

const index = "game-of-thrones";

async function run() {
  // Let's start by indexing some data
  await es.indices.create({
    index,
    settings: docIndex,
    mappings: docMappings,
  });

  await es.index({
    id: "1",
    index,
    document: {
      doc_type: "twitter",
      sentences: [
        {
          content: "Winter is coming.",
        },
      ],
    },
  });

  await es.index({
    id: "2",
    index,
    document: {
      doc_type: "twitter",
      sentences: [
        {
          content: "I am the blood of the dragon.",
        },
      ],
    },
  });

  await es.index({
    id: "3",
    index,
    document: {
      doc_type: "twitter",
      sentences: [
        {
          content: "A mind needs books like a sword needs a whetstone.",
        },
      ],
    },
  });

  await es.update({
    id: "3",
    index,
    script: {
      source: "ctx._source.sentences.add(params.sentence)",
      lang: "painless",
      params: {
        sentence: {
          content: "I eat and I know things.",
        },
      },
    },
  });

  await es.update({
    id: "3",
    index,
    script: {
      source: "ctx._source.sentences.add(params.sentence)",
      lang: "painless",
      params: {
        sentence: {
          content: "I eat and I don't know things.",
        },
      },
    },
  });

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await es.indices.refresh({ index });

  // Let's search!
  const result = await es.search<Document>({
    index,
    _source: {
      excludes: ["sentences"],
    },
    query: {
      nested: {
        path: "sentences",
        score_mode: "max",
        query: {
          match: {
            "sentences.content": "I drink and I don't know things.",
          },
        },
        inner_hits: {
          _source: {
            includes: ["sentences.content"],
          },
          size: 2,
          highlight: {
            fields: {
              "sentences.content": {
                // Only want the best match part
                // https://www.elastic.co/guide/en/elasticsearch/reference/7.5/search-request-body.html#highlighting-settings
                fragment_size: 300,
                no_match_size: 100,
                number_of_fragments: 1,
              },
            },
          },
        },
      },
    },
  });

  const items = result.hits.hits
    .filter((hit) => hit._source !== null)
    .map((hit) => {
      const innerHits = hit.inner_hits?.sentences?.hits?.hits;
      let sentences: string[] = [];

      if (innerHits !== undefined) {
        sentences = innerHits
          .filter((item) => item._source)
          .map(({ _source, highlight }) =>
            highlight?.["sentences.content"]
              ? highlight["sentences.content"]
              : []
          )
          .flat();
      }

      const item: Document = {
        doc_type: hit._source!.doc_type,
        sentences: sentences.map((sentence) => ({ content: sentence })),
      };

      return item;
    });

  const hitsTotal = result.hits.total;
  let total;

  if (typeof hitsTotal === "object") {
    total = hitsTotal.value;
  } else {
    total = hitsTotal ?? 0;
  }

  console.log(
    JSON.stringify(
      {
        items,
        total,
      },
      null,
      2
    )
  );
}

run().catch((error) => {
  console.log(JSON.stringify(error.meta.body.error, null, 2));
});
