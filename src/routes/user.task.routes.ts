import { Router } from 'express'; 
import { authenticate } from '../middlewares/auth.middleware';
import { createUserTask, getUserTasks, getUserTaskById, updateUserTask,deleteUserTask} from '../services/user.task.service';
import { title } from 'node:process';



export const userTaskRouter = Router();

// for protect our route we can use authenticate midleware, we can do one by one for each rout like this .post("/",authenticate,async(req,res,next)), instead of using this way , we also can do this one time for this whole page like following way
//all the route are now protected

userTaskRouter.use(authenticate)
 

userTaskRouter.post("/",/* authenticate ,*/async(req,res,next)=>{
    try{
        const task = await createUserTask(req.user!.userId, req.body.title);
        res.status(201).json({
            success: true,
            data:{
                task,    
            }
        })

    }catch(err){
        next(err);
    }
});

userTaskRouter.get("/", async(req, res, next)=>{
    try{
        const tasks = await getUserTasks(req.user!.userId);
        res.status(200).json({
            success: true,
            data: {tasks},
        });
    }catch(err){
        next(err);
    }
})


//creating a dynamic api route
userTaskRouter.get("/:taskId", async(req,res,next)=>{
    try{
        const task = await getUserTaskById(req.params.taskId, req.user!.userId)
        res.status(200).json({
            success: true,
            data : {task}
        })

    }catch(err){
        next(err)
    }
})


userTaskRouter.patch('/:taskId', async(req,res,next)=>{
    try{
        const task = await updateUserTask(req.params.taskId,req.user!.userId,req.body.title);

        res.status(200).json({
            success: true,
            data: {task}
        })

    }catch(err){
        next(err)
    }
});

userTaskRouter.delete('/:taskId', async(req, res, next)=>{
    try{
        await deleteUserTask(req.params.taskId, req.user!.userId)

        res.status(200).json({
            success : true,
            message: 'Task deleted successfully from DB!',
        })
    }catch(err){
        next(err)
    }
})
