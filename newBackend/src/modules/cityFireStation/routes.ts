import express from "express";
import controller from "./controller";
import authenticateToken from "../../middlewares/authenticateToken";

const CityFireStationRouter = express.Router();

CityFireStationRouter.post(
  "/addcityfirestation",
  authenticateToken,
  controller.addCityFireStation
);
CityFireStationRouter.get(
  "/getallcityfirestation",
  authenticateToken,
  controller.getAllCityFireStations
);

export default CityFireStationRouter;
