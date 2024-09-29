// don't us "env-var" here, frontend doesn't have access to the environment variables
const hostUrl = process.env.NEXT_PUBLIC_HOST_URL;

const frontendConfig = {
  hostUrl,
  apiUrl: `${hostUrl}/api`,
  appName: "My App",
};

export default frontendConfig;
