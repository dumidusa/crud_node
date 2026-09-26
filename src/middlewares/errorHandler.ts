import type {NextFunction,Request, Response } from 'express'
import {logger} from '../lib/logger'; // default import
import { AppError } from '../errors/AppError';

export function errorHandler(
    err: Error,
    _res: Request,
    res: Response,
    _next: NextFunction
): void{
    if(err instanceof AppError){
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });

        return
    }

    logger.error({err}, "Unhandled Error")

    res.status(500).json({
        success: false,
        message: "Internal server error",
    })
}