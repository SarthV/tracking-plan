import express from "express";
import cors from "cors";
import logger from "./app/config/logger";
import bodyParser from "body-parser";
import trackingPlanRouter from "./app/routes/tracking.plan.routes";
import { myDataSource }  from "./app/config/app-data-source";
import { DataSourceOptions, createConnection } from "typeorm";
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

createConnection(myDataSource as DataSourceOptions).then(() => {
  logger.info("Database connection created");
}).catch((error) => {
  logger.error(`Error in database connection, ${error}`)
});






