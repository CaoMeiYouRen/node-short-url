import { LIMIT } from '@/config'
import { HttpStatusCode } from '@/models/HttpStatusCode'
import RateLimit from 'express-rate-limit'

const statusCode = HttpStatusCode.TOO_MANY_REQUESTS // 429

export const limiter = RateLimit({
    // store: new RedisStore({ client: redis, windowMs: 1 }),
    statusCode,
    windowMs: LIMIT.LIMIT_INTERVAL * 1000, // 每秒钟不大于10次
    max: LIMIT.LIMIT_MAX, // 最大次数
    handler(req, res, next) { // 响应格式
        if (!res.headersSent) { // 若请求还未结束，则回复请求次数超限
            res.format({
                // text() {
                //     res.status(statusCode).end('请求次数超限\nToo many requests, please try again later.')
                // },
                json() {
                    res.status(statusCode).json({ statusCode, message: '请求次数超限' })
                },
                html() {
                    res.status(statusCode).end('<h1>请求次数超限\nToo many requests, please try again later.</h1>')
                },
            })
        }
    },
})