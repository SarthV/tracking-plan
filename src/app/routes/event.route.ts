import { Router } from "express";
import eventController from "../controller/event.controller";

const eventRouter = Router();

eventRouter.get("/", eventController.getAllEvents);

eventRouter.post("/", eventController.createEvent);

export default eventRouter;
