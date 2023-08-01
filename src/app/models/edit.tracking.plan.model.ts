import { EventModel } from "./event.model";

export interface EditTrackingPlanRequest {
  id: string;
  name: string;
  description: string;
  source: string;
  events: EventModel[];
}