import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import config from "../configs";

const db = drizzle(new Pool(config.databases.db));

export default db;

export type DbClient = typeof db;
