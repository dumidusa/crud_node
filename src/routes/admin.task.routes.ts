import { Router }  from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/admin.middleware";
import { getAdminTasks, updateAdminTaskStatus } from "../services/admin.task.service";
import { updateTaskTitle } from "../repositories/user.task.repository";
import { updateUserTask } from "../services/user.task.service";

export const adminTaskRouter = Router();

// this paticular route/page only accessible for admin, 
adminTaskRouter.use(authenticate,requireAdmin)
//we need to see role to , that is admin or not

adminTaskRouter.get('/', async(req,res,next)=>{
    try{

        const data = await getAdminTasks(req.query)
        res.status(200).json({
            success: true,
            data,
        });
    }catch(err){
        next(err)
    }
});

//UPDATE TASK STATUS
adminTaskRouter.patch("/:taskId/status", async(req, res, next)=>{
    try{
        const task = await updateAdminTaskStatus(
            req.params.taskId,
            req.body.status
        )

        res.status(200).json({
            success: true,
            data: {task}

        })

    }catch(err){
        next(err)
    }
})