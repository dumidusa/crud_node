import { AppError } from "../errors/AppError";
import { findAllTasks, updateTaskStatus } from "../repositories/admin.task.repository";
import type { Task } from "../types/task";

type AdminTaskListQuery = {
    search?: string;
    status?: string;
}

type AdminTaskListResponse = {
    tasks: Task[]
}

const TASK_STATUS = ['OPEN', 'IN_PROGRESS', 'RESOLVED'] as const;

type TaskStatus = (typeof TASK_STATUS)[number]

export async function getAdminTasks(
    query: AdminTaskListQuery
): Promise<AdminTaskListResponse> {
    const search = query.search?.trim() || undefined;
    const status = query.status?.trim() || undefined;

    if (status && !TASK_STATUS.includes(status as TaskStatus)) {
        throw new AppError(400, "status must be one of: open, in progress or resolved")
    }

    const tasks = await findAllTasks({
        search, status
    })

    return {
        tasks
    }
}

export async function updateAdminTaskStatus(
    taskId: string,
    status: string
):Promise<Task>{

    if (typeof status !== 'string' ||
         !TASK_STATUS.includes(status as TaskStatus)) {
        throw new AppError(400, "status must be one of: open, in progress or resolved")
    }

    const task = await updateTaskStatus(taskId,status)
    if(!task){
        throw new AppError(404, "Task not found")
    }

    return task


}