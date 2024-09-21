import esConfig from "./elasticsearch-config";
import pgConfig from "./pg-config";
// import sqliteConfig from "./sqlite-config";

const config = {
  databases: {
    elasticsearch: esConfig,
    // not in use anymore
    // db: sqliteConfig,
    db: pgConfig,
  },
};

export default config;
