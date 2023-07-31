import { Request, Response } from "express";
import { TrackingPlanModel } from "../requestModels/tracking.plan.model";
import trackingPlanService from "../service/tracking.plan.service";
import validator from "../utils/validator";

const createTrackingPlan = async (req: Request, res: Response) => {
    try {
        const trackingPlanModel: TrackingPlanModel = req.body;
        validator.validateCreateTrackingPlanReq(trackingPlanModel);
        const response = await trackingPlanService.createTrackingPlan(trackingPlanModel);
        res.status(200).json({ message: "Tracking plan created successfully", data: response });
    } catch (error : any) {
        const errMessage = `Error in creating tracking plan`;
        res.status(error.statusCode || 500)
            .json({ mesage: error.message || errMessage, data: error});
    }
}

const getAllTrackingPlan = async (req: Request, res: Response) => {
    try {
        const trackingPlanList = await trackingPlanService.getAllTrackingPlans();
        res.status(200).json({data: trackingPlanList});
    } catch (error: any) {
        res.status(error.statusCode || 500).json({ message: "Error while fetching tracking plans", data: error});
    }
}

export default {
    createTrackingPlan,
    getAllTrackingPlan
}