import { ClientOptions } from "@elastic/elasticsearch";
import * as env from "env-var";

// use `Infisical` or other secrets management tools for production
// use .env file is not recommended for production
// because it is not secure, hackers can easily access it by inspecting the `process.env` object
// even we erase the environment variables after the app is started, hackers can still access it by inspecting `/proc/<pid>/environ`
const esConfig: ClientOptions = {
  node: `https://${env.get("ES_NODE").required().asString()}:${env
    .get("ES_PORT")
    .required()
    .asIntPositive()}`,
  auth: {
    username: "elastic",
    password: env.get("ELASTIC_PASSWORD").required().asString(),
  },
  tls: {
    rejectUnauthorized: false,
  },
};

export default esConfig;
