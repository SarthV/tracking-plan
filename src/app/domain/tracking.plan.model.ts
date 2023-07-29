import { EventModel } from "./event.model";

export interface TrackingPlanModel {
  name: string;
  description: string;
  events: EventModel[];
}