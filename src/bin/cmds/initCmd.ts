import { Command } from "commander";
import { readFileSync } from "fs";
import PubmedParser from "../../parsers/PubmedParser";
import { ensureEsDocIndxService } from "../../container";

const initCmd = new Command("init");

initCmd.description("Initialize the project").action(async () => {
  await ensureEsDocIndxService.execute();

  const xml = readFileSync("data-source/pubmed24n1219.xml", {
    encoding: "utf-8",
  });

  const articles = new PubmedParser().parse(xml, 3);

  // Demonstrate the output
  console.log(JSON.stringify(articles, null, 2));

  // TODO: Save the articles to the database
});

export default initCmd;
