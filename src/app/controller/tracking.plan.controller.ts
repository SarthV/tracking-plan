import { Request, Response } from "express";
import { TrackingPlanModel } from "../models/tracking.plan.model";
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

const editTrackingPlan = async (req: Request, res: Response) => {
    try {
        const editTrackingPlanReq = req.body;
        validator.validateEditTrackingPlanReq(editTrackingPlanReq)
        const editedEntity = await trackingPlanService.editTrackingPlan(editTrackingPlanReq);
        res.status(200).json(editedEntity);
    } catch (error: any) {
        const errMessage = `Error in editing tracking plan`;
        res.status(error.statusCode || 500)
            .json({ mesage: error.message || errMessage, data: error});
    }
}

export default {
    createTrackingPlan,
    getAllTrackingPlan,
    editTrackingPlan
}