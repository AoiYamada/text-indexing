import { Command } from "commander";

import { resetDocService } from "../../container";

const resetCmd = new Command("reset");

resetCmd.description("reset the project").action(async () => {
  await resetDocService.execute();
});

export default resetCmd;
