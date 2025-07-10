import { Router } from "express";
import controller from "./controller";
import authenticateToken from "../../middlewares/authenticateToken";

const AdminUserRouter = Router();

AdminUserRouter.get("/", authenticateToken, controller.getAllPersonnelNopage);
AdminUserRouter.get("/filter", authenticateToken, controller.filterPersonnel);
AdminUserRouter.get(
  "/getallpersonnel",
  authenticateToken,
  controller.getAllPersonnel
);
AdminUserRouter.get(
  "/getpersonnel",
  authenticateToken,
  controller.getPersonnel
);
AdminUserRouter.get("/getUserToken", controller.getUserToken);
AdminUserRouter.get("/userauthenticate", controller.authenticateUserToken);
AdminUserRouter.post(
  "/addPersonnel",
  authenticateToken,
  controller.addPersonnel
);
AdminUserRouter.post("/login", controller.login);
AdminUserRouter.post("/logout", authenticateToken, controller.logout);
AdminUserRouter.post("/generateRefreshToken", controller.generateRefreshToken);
AdminUserRouter.put(
  "/updatepersonnel",
  authenticateToken,
  controller.updatePersonnel
);

export default AdminUserRouter;
