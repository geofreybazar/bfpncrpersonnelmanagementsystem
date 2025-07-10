import express from "express";
import controller from "./controller";
import authenticateToken from "../../middlewares/authenticateToken";

const OfficeRouter = express.Router();

OfficeRouter.post("/", authenticateToken, controller.addOffice);
OfficeRouter.put("/:id", authenticateToken, controller.updateOfficeDetail);
OfficeRouter.get("/", authenticateToken, controller.getAllOffices);
OfficeRouter.get(
  "/getcityoffices",
  authenticateToken,
  controller.getCityOffices
);
OfficeRouter.get("/getofficedetails", controller.getOfficeDetails);

export default OfficeRouter;
