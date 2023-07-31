import { getConnection, getCustomRepository, getRepository } from "typeorm";
import { TrackingPlanModel } from "../requestModels/tracking.plan.model";
import { TrackingPlan } from "../entity/tracking.plan.entity";
import logger from "../config/logger";
import eventService from "./event.service";
import MapUtils from "../utils/map.utils";
import EntityAlreadyExists from "../error/entity.already.exist.error";
import * as _ from "lodash";
import trackingPlanRepositoryHelper from "../repository/tracking.plan.repository.helper";
import InternalServerError from "../error/internal.server.error";

/* 
The below method does not allow duplicate tracking plan and events to be created.
**/
const createTrackingPlan = async (trackingPlanModel: TrackingPlanModel) => {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const trackingPlanRepository = connection.getRepository(TrackingPlan);
        const existingTrackingPlan = await trackingPlanRepository.createQueryBuilder("trackingPlan")
            .where("trackingPlan.name = :name", {name : trackingPlanModel.name}).getOne();
        if (existingTrackingPlan != null || existingTrackingPlan != undefined) {
            throw new EntityAlreadyExists(`TrackingPlan already exists with the same name. Name = ${existingTrackingPlan.name}`);
        }
        if (!_.isEmpty(trackingPlanModel.events)) {
            const existingEvents = await eventService.getEventsByName(trackingPlanModel.events.map((eventModel) => eventModel.name), connection);
            if (!_.isEmpty(existingEvents)) {
                throw new EntityAlreadyExists(`Event(s) already present. Existing events: ${JSON.stringify(existingEvents)}`);
            }
        }
        const trackingPlanEntity = MapUtils.mapTrackingPlanModelToEntity(trackingPlanModel);
        await trackingPlanRepository.save(trackingPlanEntity);
        await queryRunner.commitTransaction();
        return trackingPlanEntity;
    } catch (error) {
        logger.error(`Error in creating tracking plan. Error: ${error}`);
        await queryRunner.rollbackTransaction();
        throw new InternalServerError(_.isEmpty(error.mesage) ? error.mesage: "Error in creating tracking plan. Something went wrong");
    } finally {
        await queryRunner.release();
    }
}

const getAllTrackingPlans = async () => {
    try {
        return await trackingPlanRepositoryHelper.getTrackingPlanRepository();
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