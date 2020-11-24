import { HttpError } from '@/models/HttpError'
import { printTime, sleep } from '@/utils'
import express from 'express'
const router = express.Router()

router.get('/error', (req, res, next) => {
    throw new HttpError(500, '服务器出现错误')
})

router.all('*', (req, res, next) => {
    throw new HttpError(404, '404 Not Found')
})

export default router