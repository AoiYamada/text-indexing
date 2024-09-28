import * as env from "env-var";

const hostUrl = env.get("NEXT_PUBLIC_HOST_URL").asString();

const frontendConfig = {
  hostUrl,
  apiUrl: `${hostUrl}/api`,
  appName: "My App",
};

export default frontendConfig;
