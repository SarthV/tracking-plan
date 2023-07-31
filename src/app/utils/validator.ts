import Joi from "joi";
import { TrackingPlanModel } from "../requestModels/tracking.plan.model";
import BadRequestError from "../error/bad.request.error";
import { EventModel } from "../requestModels/event.model";

const createEventSchema = Joi.object({
    name: Joi.string().required().min(1),
    description: Joi.string().allow(""),
    rules: Joi.object().required(),
    trackingPlanNameList: Joi.array().items(Joi.string()),
});

const createTrackingPlanSchema = Joi.object({
    name: Joi.string().required().min(1),
    description: Joi.string().allow(""),
    events: Joi.array().items(createEventSchema),
    source: Joi.string().required().min(1),
});

const validateCreateTrackingPlanReq = (trackingPlanModel: TrackingPlanModel) => {
    const { error } = createTrackingPlanSchema.validate(trackingPlanModel);
  if (error) {
    throw new BadRequestError(`Invalid tracking plan data: ${error.message}`);
  }
}

const validateCreateEventReq = (eventModel: EventModel) => {
  const {error} = createEventSchema.validate(eventModel);
  if (error) {
    throw new BadRequestError(`Invalid create event data. Error: ${error.message}`);
  }
}

export default {
    validateCreateTrackingPlanReq,
    validateCreateEventReq
}