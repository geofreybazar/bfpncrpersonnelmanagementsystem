import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const MONGO_URL = process.env.MONGO_URL;
export default {
  PORT,
  JWT_SECRET,
  REFRESH_TOKEN,
  MONGO_URL,
};
