import express from "express";
import morgan from "morgan";
import cors from "cors";

import config from "./config/config";
import connectToDB from "./config/connectToDb";
import upload from "./config/multer";
import cookieParser from "cookie-parser";

import unknownEndpoint from "./middlewares/unknownEndpoint";
import { errorHandler } from "./middlewares/errorHandler";

import AdminUserRouter from "./modules/adminUsers/routes";
import FireSubStationRouter from "./modules/fireSubStation/routes";
import OfficeRouter from "./modules/office/routes";
import FireDistrictRouter from "./modules/fireDistrict/routes";
import CityFireStationRouter from "./modules/cityFireStation/routes";
import PersonalInfoRouter from "./modules/personalInformation/routes";
import FamilyBackgroundRouter from "./modules/familyBackground/routes";
import BfpInformationRouter from "./modules/bfpInfromation/routes";
import CasesRouter from "./modules/Cases/routes";
import ApplicationsRouter from "./modules/applications/route";

const MONGO_URL = config.MONGO_URL;
const app = express();

connectToDB(MONGO_URL);
morgan.token("body", function (req: express.Request) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(morgan(":method :url :status :body"));
app.use(express.json());
app.use(cookieParser());

app.use("/users", upload.array("image"), AdminUserRouter);
app.use("/firesubstation", FireSubStationRouter);
app.use("/backend_office", OfficeRouter);
app.use("/firedistrict", FireDistrictRouter);
app.use("/cityfirestations", CityFireStationRouter);
app.use("/pdspersonalinfo", PersonalInfoRouter);
app.use("/familybackground", FamilyBackgroundRouter);
app.use("/bfpinformation", BfpInformationRouter);
app.use("/caseslist", CasesRouter);
app.use("/backend_application", ApplicationsRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

export default app;
