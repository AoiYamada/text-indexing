import esConfig from "./elasticsearch-config";
import sqliteConfig from "./sqlite-config";

const config = {
  databases: {
    elasticsearch: esConfig,
    sqlite: sqliteConfig,
  },
};

export default config;
