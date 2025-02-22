import express from "express";
import cityFireStationController from "../controller/cityFireStationController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const cityFireStationRouter = express.Router();

cityFireStationRouter.post(
  "/addcityfirestation",
  authenticateToken,
  cityFireStationController.addCityFireStation
);
cityFireStationRouter.get(
  "/getallcityfirestation",
  authenticateToken,
  cityFireStationController.getAllCityFireStations
);

export default cityFireStationRouter;
