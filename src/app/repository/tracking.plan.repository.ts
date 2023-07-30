import { EntityRepository, Repository } from "typeorm";
import { TrackingPlan } from "../entity/tracking.plan.entity";

@EntityRepository(TrackingPlan)
export class TrackingPlanRepository extends Repository<TrackingPlan> {
}