import { Command } from "commander";

const statsCmd = new Command("stats");

statsCmd
  .description("Overview of the stats of the project")
  .action(async (...params) => {
    console.log(params);
  });

export default statsCmd;
