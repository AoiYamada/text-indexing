import "dotenv/config";
import es from "./elasticsearch";
import EsDocRepository from "./repositories/elasticsearch/EsDocRepository";

const index = "game-of-thrones";
const esDocRepo = new EsDocRepository(es, index);

async function run() {
  // Let's start by indexing some data
  await esDocRepo.init();

  await esDocRepo.create({
    doc_id: 1,
    doc_type: "twitter",
    sentences: ["Winter is coming."],
  });

  await esDocRepo.create({
    doc_id: 2,
    doc_type: "twitter",
    sentences: ["I am the blood of the dragon."],
  });

  await esDocRepo.create({
    doc_id: 3,
    doc_type: "twitter",
    sentences: ["A mind needs books like a sword needs a whetstone."],
  });

  await esDocRepo.update({
    doc_id: 3,
    sentence: "I eat and I know things.",
  });

  await esDocRepo.update({
    doc_id: 3,
    sentence: "I eat and I don't know things.",
  });

  // here we are forcing an index refresh, otherwise we will not
  // get any result in the consequent search
  await es.indices.refresh({ index });

  // Let's search!
  const result = await esDocRepo.search("I drink and I don't know things.");

  console.log(JSON.stringify(result, null, 2));
}

run().catch((error) => {
  console.log(JSON.stringify(error.meta.body.error, null, 2));
});
