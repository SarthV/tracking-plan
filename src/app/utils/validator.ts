import Joi from "joi";
import { TrackingPlanModel } from "../models/tracking.plan.model";
import BadRequestError from "../error/bad.request.error";
import { EventModel } from "../models/event.model";
import { EditTrackingPlanRequest } from "../models/edit.tracking.plan.model";

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

const editEventSchema = Joi.object({
  id: Joi.string().required().min(1),
  name: Joi.string().required().min(1),
  description: Joi.string().allow(""),
  rules: Joi.object().required(),
});

const editTrackingPlanSchema = Joi.object({
  id: Joi.string().required().min(1),
  name: Joi.string().required().min(1),
  description: Joi.string().allow(""),
  events: Joi.array().items(editEventSchema),
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

const validateEditTrackingPlanReq = (editTrackingPlanReq: EditTrackingPlanRequest) => {
  const {error} = editTrackingPlanSchema.validate(editTrackingPlanReq);
  if (error) {
    throw new BadRequestError(`Invalid edit tracking plan data. Error: ${error.message}`);
  }
}

export default {
    validateCreateTrackingPlanReq,
    validateCreateEventReq,
    validateEditTrackingPlanReq
}