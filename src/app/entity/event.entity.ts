import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { DateTimeBaseEntity } from "./date.time.entity";
import AppUtils from "../utils/app.utilities";
import { TrackingPlan } from "./tracking.plan.entity";
import { EventTrackingPlan } from "./event.tracking.plan";

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
    @JoinTable()
    public trackingPlans!: TrackingPlan[];

    @OneToMany(() => EventTrackingPlan, etp => etp.event)
    public eventTrackingPlans!: EventTrackingPlan[];
}