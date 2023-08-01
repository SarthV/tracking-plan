import { getConnection, getCustomRepository, getRepository } from "typeorm";
import { TrackingPlanModel } from "../models/tracking.plan.model";
import { TrackingPlan } from "../entity/tracking.plan.entity";
import logger from "../config/logger";
import eventService from "./event.service";
import MapUtils from "../utils/map.utils";
import EntityAlreadyExists from "../error/entity.already.exist.error";
import * as _ from "lodash";
import trackingPlanRepositoryHelper from "../repository/tracking.plan.repository.helper";
import InternalServerError from "../error/internal.server.error";
import { EditTrackingPlanRequest } from "../models/edit.tracking.plan.model";
import BadRequestError from "../error/bad.request.error";
import mapUtils from "../utils/map.utils";
import eventController from "../controller/event.controller";

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
            .where("trackingPlan.name = :name", {name : trackingPlanModel.name})
            .andWhere("trackingPlan.isDeleted = false")
            .getOne();
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

const editTrackingPlan = async (editTrackingPlanReq : EditTrackingPlanRequest) => {
    const existingEntity = await getRepository(TrackingPlan)
        .createQueryBuilder("trackingPlan")
        .where("trackingPlan.id = :id", {id : editTrackingPlanReq.id})
        .getOne();
    if (_.isEmpty(existingEntity)) {
        throw new BadRequestError("Tracking plan does not exist");
    }
    let eventsToBeAssigned = [];
    if (!_.isEmpty(editTrackingPlanReq.events)) {
        eventsToBeAssigned = await eventService.getEventsByName(editTrackingPlanReq.events.map((eventModel) => eventModel.name))
        if (eventsToBeAssigned.length != editTrackingPlanReq.events.length) {
            throw new BadRequestError("Events not found. Provided event name(s) do not exist");
        }
    }
    mapUtils.mapEditTrackingPlanModelToEntity(existingEntity, editTrackingPlanReq, eventsToBeAssigned);
    await getRepository(TrackingPlan).save(existingEntity);
    return existingEntity;
}

export default {
    createTrackingPlan,
    getAllTrackingPlans,
    getTrackingPlansByName,
    editTrackingPlan
}