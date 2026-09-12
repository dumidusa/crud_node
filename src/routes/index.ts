//combine all ur routes of application
//pluging all routes in one place

import { Router } from "express";
import { healthRouter } from "./health.routes";

export const apiRouter = Router();

apiRouter.use(healthRouter);
// apiRouter.use();