import express from "express";
import cors from "cors";
import dbConfig from "./app/config/db.config";
import logger from "./app/config/logger";
import mysql from "mysql2";

const app = express();
const port = 8080;

app.use(cors());

app.get("/health", (req, res) => {
    res.status(200).send("Heartbeat API success");
});
  
app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
});

mysql.createConnection(dbConfig).connect((error) => {
    if (error) {
      logger.error(`Error in database connection, ${error}`)
    } else {
      logger.info("Database connection created")
    }
});






