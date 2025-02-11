import express from "express";
import fireDistrictController from "../controller/fireDistrictController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const fireDistrictRouter = express.Router();

fireDistrictRouter.post(
  "/addfiredistrict",
  authenticateToken,
  fireDistrictController.addFireDistrict
);
fireDistrictRouter.get(
  "/getfiredistrict",
  authenticateToken,
  fireDistrictController.getFireDistrict
);

export default fireDistrictRouter;
