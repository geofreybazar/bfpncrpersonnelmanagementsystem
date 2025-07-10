import { Router } from "express";
import controller from "./controller";
import authenticateToken from "../../middlewares/authenticateToken";

const FireSubStationRouter = Router();

FireSubStationRouter.get(
  "/getallfiresubstation",
  authenticateToken,
  controller.getAllFireSubStation
);
FireSubStationRouter.get(
  "/getcityfiresubstation",
  authenticateToken,
  controller.getCityFireSubStation
);
FireSubStationRouter.get(
  "/getfiresubstationdetials",
  controller.getFireSubStationDetail
);
FireSubStationRouter.post(
  "/addfiresubstation",
  authenticateToken,
  controller.addFireSubStation
);
FireSubStationRouter.post(
  "/addfiretruck/:id",
  authenticateToken,
  controller.addFireTruck
);
FireSubStationRouter.post(
  "/addambulance/:id",
  authenticateToken,
  controller.addAmbulance
);
FireSubStationRouter.put(
  "/updatefiresubstaion/:id",
  authenticateToken,
  controller.updateFireSubStationDetail
);

export default FireSubStationRouter;
