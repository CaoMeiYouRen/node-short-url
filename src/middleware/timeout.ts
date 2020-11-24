import express, { Request, Response, NextFunction } from 'express'
import { HttpStatusCode } from '@/models/HttpStatusCode'
import { TIMEOUT } from '@/config'
export async function handleTimeout(req: Request, res: Response, next: NextFunction) {
    const time = TIMEOUT
    // 设置所有HTTP请求的服务器响应超时时间
    res.setTimeout(time, () => {
        // throw new HttpError(HttpStatusCode.REQUEST_TIMEOUT, '请求响应超时')
        const statusCode = HttpStatusCode.REQUEST_TIMEOUT // 408
        if (!res.headersSent) { // 若请求还未结束，则回复超时
            res.status(statusCode).json({
                statusCode,
                message: '请求响应超时'
            })
        }
    })
    next()
}