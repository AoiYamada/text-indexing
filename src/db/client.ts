import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import config from "../configs";
import * as schema from "./schema";

// Initialize the SQLite database
const sqlite = new Database(config.databases.db);
// Seems doesn't need this
// sqlite.pragma("foreign_keys = ON");

// Create the Drizzle ORM instance
const db = drizzle(sqlite, {
  schema,
});

export default db;

export type DbClient = typeof db;
