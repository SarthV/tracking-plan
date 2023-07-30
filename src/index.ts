import express from "express";
import cors from "cors";
import dbConfig from "./app/config/db.config";
import logger from "./app/config/logger";
import bodyParser from "body-parser";
import trackingPlanRouter from "./app/routes/tracking.plan.routes";
import { myDataSource }  from "./app/app-data-source";
import { createConnection } from "typeorm";
import { error } from "winston";
import trackingPlanController from "./app/controller/tracking.plan.controller";
import { TrackingPlan } from "./app/entity/tracking.plan.entity";
import { DateTimeBaseEntity } from "./app/entity/date.time.entity";
import { Event } from "./app/entity/event.entity";
import eventRouter from "./app/routes/event.route";

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.get("/health", (req, res) => {
    res.status(200).send("Heartbeat API success");
});
  
app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});

app.use("/tracking-plan", trackingPlanRouter);
app.use("/event", eventRouter);

createConnection({
  type: 'mysql',
  connectorPackage: 'mysql2',
  username: "root",
  host: process.env.MYSQL_HOST,
  database: "tracking_plan",
  password: "22sarthV!",
  port: 3306,
  synchronize: false,
  entities: [TrackingPlan, Event],
}).then(() => {
  logger.info("Database connection created");
}).catch((error) => {
  logger.error(`Error in database connection, ${error}`)
});

// .connect((error) => {
//     if (error) {
//       logger.error(`Error in database connection, ${error}`)
//     } else {
//       logger.info("Database connection created");
//       app.use("/tracking-plan", router);
//     }
// });
// myDataSource
//   .initialize()
//   .then(() => {
//     console.log("Data Source has been initialized!")
//   })
//   .catch((err) => {
//     console.error("Error during Data Source initialization:", err)
//   })






