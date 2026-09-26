import { AppError } from '../errors/AppError';
import type {Task} from '../types/task';
import {
    createTask,
    deletetask,
    fetchTaskByUserId,
    findTaskByIdAndUserId,
    updateTaskTitle
} from '../repositories/user.task.repository';
import { userTaskRouter } from '../routes/user.task.routes';

function validateTitle(title: unknown): string{
    if(typeof title !== 'string' || !title.trim()){ throw new AppError(400, "Title is requried")}
    const trimmedTitle = title.trim()
    if(trimmedTitle.length > 180 ){
        throw new AppError(400, 'Title must be 180 chart or less')
    }
    return trimmedTitle
}

export async function createUserTask(userId: string, title:unknown): Promise<Task>{

    const validTitle = validateTitle(title)
    return createTask(userId, validTitle);
}


export async function getUserTasks(userId: string):Promise<Task[]>{
    return fetchTaskByUserId(userId);
}

export async function getUserTaskById(taskId: string, userId: string): Promise<Task> {
   const task = await findTaskByIdAndUserId(taskId, userId);
    if(!task){
        throw new AppError(404, "Task not found")
    }

    return task
}

export async function updateUserTask(
    taskId: string,
    userId: string,
    title: string
): Promise<Task>{
    const validTitle = validateTitle(title)
    const task = await  updateTaskTitle(taskId,userId,validTitle)
    
    if(!task){
        throw new AppError(404, "Task not found!");
    }

    return task

}

export async function deleteUserTask(
    taskId: string,
    userId: string,
):Promise<void>{
    const deletd = await deletetask(taskId,userId)
   
    if(!deletd){
        throw new AppError(404, "Task not found")
    }
    
}

