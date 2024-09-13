import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import config from "../../configs";

// Initialize the SQLite database
const sqlite = new Database(config.databases.sqlite);

// Create the Drizzle ORM instance
const db = drizzle(sqlite);

export default db;
