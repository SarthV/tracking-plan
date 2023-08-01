import { Router } from "express";
import trackingPlanController from "../controller/tracking.plan.controller"

const trackingPlanRouter = Router();

trackingPlanRouter.post("/", trackingPlanController.createTrackingPlan);

trackingPlanRouter.get("/", trackingPlanController.getAllTrackingPlan);

trackingPlanRouter.put("/edit", trackingPlanController.editTrackingPlan);

export default trackingPlanRouter;