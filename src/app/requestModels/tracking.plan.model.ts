import { EventModel } from "./event.model";

export interface TrackingPlanModel {
  name: string;
  description: string;
  source: string;
  events: EventModel[];
}