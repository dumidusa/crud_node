//combine all ur routes of application
//pluging all routes in one place

import { Router } from "express";
import { healthRouter } from "./health.routes";
import { authRouter } from "./auth.routes";
import { userTaskRouter } from "./user.task.routes";
import { adminTaskRouter } from "./admin.task.routes";

export const apiRouter = Router();

apiRouter.use(healthRouter);
// apiRouter.use();
apiRouter.use("/auth", authRouter);
apiRouter.use("/tasks", userTaskRouter);
apiRouter.use("/admin/tasks", adminTaskRouter);
