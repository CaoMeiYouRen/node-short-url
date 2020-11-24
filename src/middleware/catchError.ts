import express, { Request, Response, NextFunction } from 'express'
import { HttpError } from '@/models/HttpError'
import { HttpStatusCode } from '@/models/HttpStatusCode'
import { ResponseDto } from '@/models/ResponseDto'
import { IS_DEBUG } from '@/config'
import { Log } from '@/utils'

export function catchError(err: any, req: Request, res: Response, next: NextFunction) {
    let message: any = 'Unknown Error'
    let statusCode = HttpStatusCode.INTERNAL_SERVER_ERROR // 500
    if (err instanceof HttpError) {
        message = err.message
        statusCode = err.statusCode
    } else if (err instanceof Error) {
        // 开发阶段打印堆栈信息，否则打印 message
        message = IS_DEBUG ? err.stack : err.message
    } else if (typeof err === 'string') {
        message = err
    }
    if (statusCode >= HttpStatusCode.INTERNAL_SERVER_ERROR) {
        Log.error(message)
    }
    if (!res.headersSent) { // 若请求还未结束，则回复错误
        res.status(statusCode).json(new ResponseDto({
            statusCode,
            message,
        }))
    }
}