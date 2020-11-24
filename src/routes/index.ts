import express from 'express'
import { HttpError } from '@/models/HttpError'
import { printTime, sleep, getRandomCode, md5, isURL } from '@/utils'
import { redis } from '@/db'
import { BASE_URL } from '@/config'
import { ResponseDto } from '@/models/ResponseDto'

const router = express.Router()

router.get('/shortUrl', async (req, res, next) => {
    const url = req.query.url as string
    if (!url) {
        throw new HttpError(400, '未提交 url 参数')
    }
    if (!isURL(url)) {
        throw new HttpError(400, '提交的 url 参数不是有效的URL')
    }
    const hash = md5(url)
    let shortUrl = await redis.get(hash)
    if (shortUrl) { // 已经存在则直接返回
        res.json(new ResponseDto({
            statusCode: 200,
            data: {
                shortUrl,
            },
        }))
        return
    }
    const short = getRandomCode(8)
    if (await redis.get(short)) {
        throw new HttpError(400, '生成的短链重复，请重试')
    }
    shortUrl = BASE_URL + short
    await redis.set(short, url) // 根据短链找长链
    await redis.set(hash, shortUrl) // 根据长链 hash 找短链
    res.json(new ResponseDto({
        statusCode: 200,
        data: {
            shortUrl,
        },
    }))
    return
})

router.get('/longUrl', async (req, res, next) => {
    const url = req.query.url as string
    if (!url) {
        throw new HttpError(400, '未提交 url 参数')
    }
    const short = url.slice(BASE_URL.length)
    const longUrl = await redis.get(short)
    if (!longUrl) {
        throw new HttpError(404, '当前短链不存在对应长链，请生成长链后重试')
    }
    res.json(new ResponseDto({
        statusCode: 200,
        data: {
            longUrl,
        },
    }))
    return
})

router.get('/:short', async (req, res, next) => {
    const short = req.params.short
    if (!short) {
        return
    }
    const longUrl = await redis.get(short)
    if (!longUrl) {
        throw new HttpError(404, '当前短链不存在对应长链，请生成长链后重试')
    }
    res.status(301).redirect(longUrl)
})

router.all('*', (req, res, next) => {
    throw new HttpError(404, '404 Not Found')
})

export default router