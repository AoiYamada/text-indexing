import * as env from "env-var";

const hostUrl = env.get("NEXT_PUBLIC_HOST_URL").asString();

const appConfig = {
  hostUrl,
  apiUrl: `${hostUrl}/api`,
  appName: "My App",
};

export default appConfig;
