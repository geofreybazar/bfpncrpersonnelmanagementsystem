import express from "express";
import controller from "./controller";

const ApplicationsRouter = express.Router();

ApplicationsRouter.get("/", controller.getApplications);
ApplicationsRouter.get("/:id", controller.getApplication);

export default ApplicationsRouter;
