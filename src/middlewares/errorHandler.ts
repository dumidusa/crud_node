import type {NextFunction,Request, Response } from 'express'
import {logger} from '../lib/logger'; // default import

export function errorHandler(
    err: Error,
    _res: Request,
    res: Response,
    _next: NextFunction
): void{
    logger.error({err}, "Unhandled Error")

    res.status(500).json({
        success: false,
        message: "Internal server error",
    })
}