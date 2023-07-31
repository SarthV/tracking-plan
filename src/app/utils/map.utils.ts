import _ from "lodash";
import { EventModel } from "../requestModels/event.model";
import { TrackingPlanModel } from "../requestModels/tracking.plan.model"
import { Event } from "../entity/event.entity";
import { TrackingPlan } from "../entity/tracking.plan.entity"

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

export default {
    mapTrackingPlanModelToEntity,
    mapEventModelToEntity
}