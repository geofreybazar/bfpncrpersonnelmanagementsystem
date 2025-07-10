import dotenv from "dotenv";
dotenv.config();

interface Config {
  PORT: number;
  JWT_SECRET: string;
  REFRESH_TOKEN: string;
  MONGO_URL: string;
}

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

const config: Config = {
  PORT: Number(process.env.PORT) || 3005,
  JWT_SECRET: getEnvVar("JWT_SECRET"),
  REFRESH_TOKEN: getEnvVar("REFRESH_TOKEN"),
  MONGO_URL: getEnvVar("MONGO_URL"),
};

export default config;
