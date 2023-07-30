import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { DateTimeBaseEntity } from "./date.time.entity";
import AppUtils from "../utils/app.utilities";
import { TrackingPlan } from "./tracking.plan.entity";

@Entity()
export class Event extends DateTimeBaseEntity {
    @PrimaryColumn()
    public id: string = AppUtils.generateEventId();

    @Column()
    public name!: string;

    @Column()
    public description!: string;

    @Column({ type : "json" })
    public rules!: object;

    @ManyToMany(() => TrackingPlan, trackingPlan => trackingPlan.events)
    @JoinTable({name: "tracking_plan_event", 
        joinColumn: { name : "event_id"},
        inverseJoinColumn: { name: "tracking_plan_id"}})
    public trackingPlans!: TrackingPlan[];
}