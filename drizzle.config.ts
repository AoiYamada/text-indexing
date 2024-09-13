import "dotenv/config";
import { defineConfig } from "drizzle-kit";

import config from "./src/configs";

export default defineConfig({
  schema: "src/db/schema/index.ts",
  out: "src/db/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: `file:${config.databases.db}`,
  },
  // Print all statements
  verbose: true,
  // Always ask for my confirmation
  strict: true,
});
