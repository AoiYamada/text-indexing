import { Command } from "commander";

import { ensureEsDocIndxService } from "../../container";

const initCmd = new Command("init");

initCmd.description("Initialize the project").action(async () => {
  await ensureEsDocIndxService.execute();
});

export default initCmd;
