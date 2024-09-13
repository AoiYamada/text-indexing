import { Command } from "commander";
import logger from "../../logger";

const statsCmd = new Command("stats");

statsCmd
  .description("Overview of the stats of the project")
  .action(async (...params) => {
    logger.info("Stats command executed with params: %o", params);
  });

export default statsCmd;
