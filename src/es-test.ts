import "dotenv/config";
import es from "./elasticsearch";
import EsDocRepository from "./repositories/elasticsearch/EsDocRepository";
import logger from "./logger";
// import { DocAnalyzer } from "./elasticsearch/indices/doc/analysis";

const index = "game-of-thrones";
const esDocRepo = new EsDocRepository(es, index);

async function run() {
  // Let's start by indexing some data
  // await esDocRepo.init();
  // await prepareDate();

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  // await esDocRepo.refresh();

  // await testSearch();
  // await testAnalyzer();
  const terms = await esDocRepo.termVectors(3, ["sentences.content"], {
    offsets: false,
    payloads: false,
    positions: false,
    term_statistics: false,
    field_statistics: false,
  });

  console.log(JSON.stringify(terms, null, 2));
}

run().catch((error) => {
  logger.error(JSON.stringify(error.meta.body.error, null, 2));
});

// async function prepareDate() {
//   await esDocRepo.create({
//     doc_id: 1,
//     doc_type: "twitter",
//     sentences: ["Winter is coming."],
//   });

//   await esDocRepo.create({
//     doc_id: 2,
//     doc_type: "twitter",
//     sentences: ["I am the blood of the dragon."],
//   });

//   await esDocRepo.create({
//     doc_id: 3,
//     doc_type: "twitter",
//     sentences: ["A mind needs books like a sword needs a whetstone."],
//   });

//   await esDocRepo.update({
//     doc_id: 3,
//     sentence: "I eat and I know things.",
//   });

//   await esDocRepo.update({
//     doc_id: 3,
//     sentence: "I eat and I don't know things.",
//   });
// }

// async function testSearch() {
//   const result = await esDocRepo.search("I drink and I don't know things.");

//   logger.info(JSON.stringify(result, null, 2));
// }

// async function testAnalyzer() {
//   const tokenStats = await esDocRepo.analyze(
//     "I do drink and I don't know things. You go to work by bus.",
//     DocAnalyzer.Stop
//   );

//   console.log(JSON.stringify(tokenStats, null, 2));
// }
