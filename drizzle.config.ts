import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { ConnectionOptions } from "tls";

import config from "./src/configs";

type Credential = {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  ssl?:
    | boolean
    | "require"
    | "allow"
    | "prefer"
    | "verify-full"
    | ConnectionOptions;
};

export default defineConfig({
  schema: "src/db/schema/index.ts",
  out: "src/db/migrations",
  dialect: "postgresql",
  dbCredentials: { ...config.databases.db, ssl: false } as Credential,
  // Print all statements
  verbose: true,
  // Always ask for my confirmation
  strict: true,
});
