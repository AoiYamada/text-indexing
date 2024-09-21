import { PoolConfig } from "pg";
import * as env from "env-var";

const pgConfig: PoolConfig = {
  host: "localhost",
  port: 5432,
  database: env.get("POSTGRES_DB").required().asString(),
  user: env.get("POSTGRES_USER").required().asString(),
  password: env.get("POSTGRES_PASSWORD").required().asString(),
  // max: 1,
};

export default pgConfig;
