import { DataSource, getConnection, getRepository } from "typeorm";
import { Event } from "../entity/event.entity";
import { EventModel } from "../domain/event.model";
import EntityAlreadyExists from "../error/entity.already.exist.error";
import mapUtils from "../utils/map.utils";
import { TrackingPlan } from "../entity/tracking.plan.entity";
import _ from "lodash";

const getAllEvents = async () => {
    return await getRepository(Event).createQueryBuilder("event")
    .where("event.isDeleted = false")
    .getMany();
}

const getEventsByName = async (eventNameList : String[], connection : DataSource) => {
    if (_.isEmpty(eventNameList)) {
        return [];
    }
    const eventRepository = _.isEmpty(connection) ? getRepository(Event) : connection.getRepository(Event);
    const result = await eventRepository.createQueryBuilder("event")
        .where("event.name IN (:eventNameList)", {eventNameList})
        .andWhere("event.isDeleted = false")
        .getMany();
    return result;
}

const createEvent = async (eventModel: EventModel, trackingPlanList?: TrackingPlan[]) => {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
        const eventRepository = connection.getRepository(Event);
        const existingEvent = await eventRepository.createQueryBuilder("event")
            .where("event.name = :name", {name: eventModel.name})
            .getOne();
        if(existingEvent != null && existingEvent.name == eventModel.name) {
            throw new EntityAlreadyExists(`This event with name: ${eventModel.name} already exists`);
        }
        const eventEntity = mapUtils.mapEventModelToEntity(eventModel);
        await eventRepository.insert(eventEntity);
        if (!_.isEmpty(trackingPlanList)) {
            for (const trackingPlan of trackingPlanList) {
                if (_.isEmpty(trackingPlan.events)) {
                    trackingPlan.events = [eventEntity];
                } else {
                    trackingPlan.events.push(eventEntity);
                }
            }
            const trackingPlanRepo = connection.getRepository(TrackingPlan);
            await trackingPlanRepo.save(trackingPlanList);
        }
        await queryRunner.commitTransaction();
        return eventEntity;
    } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
    } finally {
        await queryRunner.release();
    }
}

export default {
    getEventsByName,
    getAllEvents,
    createEvent
}