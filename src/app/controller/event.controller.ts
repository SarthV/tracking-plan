import { Request, Response } from "express";
import eventService from "../service/event.service"
import { EventModel } from "../models/event.model";
import validator from "../utils/validator";
import trackingPlanService from "../service/tracking.plan.service";
import BadRequestError from "../error/bad.request.error";
import _ from "lodash";

const getAllEvents = async (req: Request, res: Response) => {
    try {
        const eventList = await eventService.getAllEvents();
        return res.status(200).json(eventList);
    } catch (error) {
        res.status(error.statusCode || 500)
            .json({ message: error.message || " Error in fetching event list"});
    }
}

const createEvent = async (req: Request, res: Response) => {
    try {
        const eventModel: EventModel = req.body;
        validator.validateCreateEventReq(eventModel);
        const trackingPlanList = await trackingPlanService.getTrackingPlansByName(eventModel.trackingPlanNameList);
        if (_.isEmpty(trackingPlanList) || trackingPlanList.length != eventModel.trackingPlanNameList.length) {
            throw new BadRequestError("Requested tracking plans do not exist");
        }
        const response = await eventService.createEvent(eventModel, trackingPlanList);
        res.status(200).json({message: "Event created successfully", data: response});
    } catch (error : any) {
        res.status(error.statusCode || 500)
            .json({ message: error.message || " Error in creating event"});
    }
}

const getEventById = async (req: Request, res: Response) => {
    const id = req.params.id;
    const eventEntity = await eventService.getEventById(id);
    if (_.isEmpty(eventEntity)) {
        res.status(500).json({message: `No event exists for the id: ${id}`});
    }
    res.status(200).json(eventEntity);
}

export default {
    getAllEvents,
    createEvent,
    getEventById
}