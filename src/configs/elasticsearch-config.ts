import { ClientOptions } from "@elastic/elasticsearch";
import * as env from "env-var";

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
