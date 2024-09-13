import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import config from "./src/configs";

export default defineConfig({
  schema: "src/db/sqlite/schema/index.ts",
  out: "src/db/sqlite/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: `file:${config.databases.sqlite}`,
  },
  // Print all statements
  verbose: true,
  // Always ask for my confirmation
  strict: true,
});
