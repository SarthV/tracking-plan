import _ from "lodash";
import { EventModel } from "../models/event.model";
import { TrackingPlanModel } from "../models/tracking.plan.model"
import { Event } from "../entity/event.entity";
import { TrackingPlan } from "../entity/tracking.plan.entity"
import { EditTrackingPlanRequest } from "../models/edit.tracking.plan.model";

const mapTrackingPlanModelToEntity = (trackingPlanModel: TrackingPlanModel) => {
    const trackingPlanEntity = new TrackingPlan();
    trackingPlanEntity.name = trackingPlanModel.name;
    trackingPlanEntity.description = trackingPlanModel.description;
    trackingPlanEntity.source = trackingPlanModel.source;
    trackingPlanEntity.events = mapEventModelListToEntityList(trackingPlanModel.events);
    return trackingPlanEntity;
}

const mapEventModelToEntity = (eventModel: EventModel) => {
    const eventEntity = new Event();
    eventEntity.name = eventModel.name;
    eventEntity.description = eventModel.description;
    eventEntity.rules = eventModel.rules;
    return eventEntity;
}

const mapEventModelListToEntityList = (eventModelList: EventModel[]) => {
    if (_.isEmpty(eventModelList)) {
        return null;
    }
    const eventEntityList : Event[] = [];
    for (const eventModel of eventModelList) {
        const eventEntity = new Event();
        eventEntity.name = eventModel.name;
        eventEntity.description = eventModel.description;
        eventEntity.rules = eventModel.rules;
        eventEntityList.push(eventEntity);
    }
    return eventEntityList;
}

const mapEditTrackingPlanModelToEntity = (existingEntity: TrackingPlan, editTrackingPlanReq: EditTrackingPlanRequest, eventsToBeAssigned: Event[]) => {
    existingEntity.description = editTrackingPlanReq.description;
    existingEntity.name = editTrackingPlanReq.name;
    existingEntity.source = editTrackingPlanReq.source;
    existingEntity.events = eventsToBeAssigned;
}

export default {
    mapTrackingPlanModelToEntity,
    mapEventModelToEntity,
    mapEditTrackingPlanModelToEntity
}