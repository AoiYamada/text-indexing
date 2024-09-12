#! /usr/bin/env node

import "dotenv/config";
import { program } from "commander";

import statsCmd from "./cmds/statsCmd";

program.addCommand(statsCmd);

program.parse(process.argv);
