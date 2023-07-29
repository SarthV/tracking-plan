import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import AppUtils from '../utils/app.utilities';
import { DateTimeBaseEntity } from "./date.time.entity";
import { Event } from "./event.entity";
import { EventTrackingPlan } from "./event.tracking.plan";

@Entity()
export class TrackingPlan extends DateTimeBaseEntity {
    @PrimaryColumn()
    public id: string = AppUtils.generateTrackingPlanId();

    @Column()
    public name!: string;

    @ManyToMany(() => Event, event => event.trackingPlans)
    public events!: Event[];

    @OneToMany(() => EventTrackingPlan, etp => etp.trackingPlan)
    public eventTrackingPlans!: EventTrackingPlan[];
}