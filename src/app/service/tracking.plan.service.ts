import { getCustomRepository, getRepository } from "typeorm";
import { TrackingPlanModel } from "../domain/tracking.plan.model";
import { TrackingPlan } from "../entity/tracking.plan.entity";
import logger from "../config/logger";
import eventService from "./event.service";
import { EventModel } from "../domain/event.model";
import MapUtils from "../utils/map.utils";
import { TrackingPlanRepository } from "../repository/tracking.plan.repository";
import EntityAlreadyExists from "../error/entity.already.exist.error";
import * as _ from "lodash";

const createTrackingPlan = async (trackingPlanModel: TrackingPlanModel) => {
    try {
        const trackingPlanRepository = getRepository(TrackingPlan);
        const existingTrackingPlan = await trackingPlanRepository.createQueryBuilder("trackingPlan")
            .where("trackingPlan.name = :name", {name : trackingPlanModel.name}).getOne();
        if (existingTrackingPlan != null || existingTrackingPlan != undefined) {
            throw new EntityAlreadyExists(`TrackingPlan already exists with the same name. Name = ${existingTrackingPlan.name}`);
        }
        if (!_.isEmpty(trackingPlanModel.events)) {
            const existingEvents = await eventService.getEventsByName(trackingPlanModel.events.map((eventModel) => eventModel.name));
            if (!_.isEmpty(existingEvents)) {
                throw new EntityAlreadyExists(`Event(s) already present. Existing events: ${JSON.stringify(existingEvents)}`);
            }
        }
        const trackingPlanEntity = MapUtils.mapTrackingPlanModelToEntity(trackingPlanModel);
        await trackingPlanRepository.save(trackingPlanEntity);
        return trackingPlanEntity;
    } catch (error) {
        logger.error(`Error in creating tracking plan. Error: ${error}`);
        throw error;
    }
}

const getAllTrackingPlans = async () => {
    try {
        const trackingPlanRepository = getRepository(TrackingPlan);
        const trackingPlanList = await trackingPlanRepository.createQueryBuilder("trackingPlan")
            .leftJoinAndSelect("trackingPlan.events", "events")
            .where("trackingPlan.isDeleted = false")
            .getMany();
        return trackingPlanList;
    } catch (error) {
        logger.error(`Error in fetching tracking plans`);
        throw error;
    }
}

const getTrackingPlansByName = async (names: string[]) => {
    try {
        const trackingPlanRepository = getRepository(TrackingPlan);
        const existingTrackingPlans = await trackingPlanRepository.createQueryBuilder("trackingPlan")
            .where("trackingPlan.name IN (:names)", {names})
            .getMany();
        return existingTrackingPlans;
    } catch (error) {
        logger.error(`Error in fetching tracking plans`);
        throw error;
    }
}

export default {
    createTrackingPlan,
    getAllTrackingPlans,
    getTrackingPlansByName
}