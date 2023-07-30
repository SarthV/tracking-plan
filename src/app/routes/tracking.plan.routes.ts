import { Router } from "express";
import trackingPlanController from "../controller/tracking.plan.controller"

const trackingPlanRouter = Router();

trackingPlanRouter.post("/", trackingPlanController.createTrackingPlan);

trackingPlanRouter.get("/", trackingPlanController.getAllTrackingPlan);

export default trackingPlanRouter;