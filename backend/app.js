import express from "express";
import morgan from "morgan";
import cors from "cors";
import userControllerRouter from "./routes/userRoute.js";
import config from "./utils/config.js";
import connectToDB from "./utils/connectToDb.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";

const MONGO_URL = config.MONGO_URL;
const app = express();

connectToDB(MONGO_URL);

morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(morgan(":method :url :status :body"));
app.use(express.json());
app.use(cookieParser());

app.use("/users", userControllerRouter);

app.use(errorHandler);

export default app;
