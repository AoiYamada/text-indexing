#! /usr/bin/env node

import "dotenv/config";
import { program } from "commander";

import initCmd from "./cmds/initCmd";
import statsCmd from "./cmds/statsCmd";
import logger from "../logger";

program.addCommand(initCmd);
program.addCommand(statsCmd);

program.parse(process.argv);

process.on("unhandledRejection", (reason) => {
  logger.error("Unhandled Rejection: %o", reason);
});

process.on("uncaughtException", (error) => {
  logger.error("Uncaught Exception: %o", error);
});
