import express from "express";
import controller from "./controller";
import authenticateToken from "../../middlewares/authenticateToken";

const FireDistrictRouter = express.Router();

FireDistrictRouter.post(
  "/addfiredistrict",
  authenticateToken,
  controller.addFireDistrict
);
FireDistrictRouter.get(
  "/getallfiredistrict",
  authenticateToken,
  controller.getAllFireDistrict
);
FireDistrictRouter.get(
  "/getfiredistrict",
  authenticateToken,
  controller.getFireDistrict
);

export default FireDistrictRouter;
