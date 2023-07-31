import { DataSource, DataSourceOptions } from "typeorm"
import { TrackingPlan } from "../entity/tracking.plan.entity";
import { Event } from "../entity/event.entity";

export const myDataSource = {
  type: 'mysql',
  connectorPackage: 'mysql2',
  username: "root",
  host: process.env.MYSQL_HOST,
  database: "tracking_plan",
  password: "password",
  port: 3306,
  synchronize: false,
  entities: [TrackingPlan, Event],
};
