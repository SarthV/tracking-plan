import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Event } from "./event.entity";
import { TrackingPlan } from "./tracking.plan.entity";

@Entity()
export class EventTrackingPlan {
  @PrimaryGeneratedColumn()
  public id!: number;

  @ManyToOne(() => Event, event => event.eventTrackingPlans)
  public event!: Event;

  @ManyToOne(() => TrackingPlan, trackingPlan => trackingPlan.eventTrackingPlans)
  public trackingPlan!: TrackingPlan;
}
