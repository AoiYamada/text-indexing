import { Command } from "commander";
// import { readFileSync } from "fs";

import {
//   createDocEmitter,
//   createDocWorker,
  ensureEsDocIndxService,
} from "../../container";
// import PubmedParser from "../../utils/parsers/PubmedParser";
// import DocType from "../../constants/DocType";

const initCmd = new Command("init");

initCmd.description("Initialize the project").action(async () => {
  await ensureEsDocIndxService.execute();

//   const xml = readFileSync("data-source/pubmed_test1.xml", {
//     encoding: "utf-8",
//   });
//   const articles = new PubmedParser().parse(xml, 1);

//   createDocWorker.start();

//   for (const article of articles) {
//     createDocEmitter.emitCreateDocEvent({
//       type: DocType.pubmed,
//       title: article.title,
//       abstract: article.abstract,
//     });
//   }

//   createDocEmitter.emitDoneEvent();
});

export default initCmd;
