import appConfig from "./app-config";
import esConfig from "./elasticsearch-config";
import sqliteConfig from "./sqlite-config";

const config = {
  app: appConfig,
  databases: {
    elasticsearch: esConfig,
    db: sqliteConfig,
  },
};

export default config;
