import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import AppUtils from '../utils/app.utilities';
import { DateTimeBaseEntity } from "./date.time.entity";
import { Event } from "./event.entity";

@Entity()
export class TrackingPlan extends DateTimeBaseEntity {
    @PrimaryColumn()
    public id: string = AppUtils.generateTrackingPlanId();

    @Column()
    public name!: string;

    @Column()
    public description!: string;

    @Column()
    public source!: string;

    @ManyToMany(() => Event, event => event.trackingPlans, { cascade: true })
    @JoinTable({name : "tracking_plan_event",
    joinColumn: {name: "tracking_plan_id"},
    inverseJoinColumn: { name: "event_id"}})
    public events!: Event[];
}