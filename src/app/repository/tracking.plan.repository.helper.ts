import { getRepository } from "typeorm";
import { TrackingPlan } from "../entity/tracking.plan.entity";

const getTrackingPlans = async () => {
    const trackingPlanRepository = getRepository(TrackingPlan);
    return await trackingPlanRepository.createQueryBuilder("trackingPlan")
        .leftJoinAndSelect("trackingPlan.events", "events")
        .where("trackingPlan.isDeleted = false")
        .getMany();
}

export default {
    getTrackingPlanRepository: getTrackingPlans
}
