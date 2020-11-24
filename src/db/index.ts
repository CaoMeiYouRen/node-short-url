import Redis from 'ioredis'
import { REDIS_CONFIG } from '@/config'
import { printTime } from '@/utils'

export const redis = new Redis({
    port: REDIS_CONFIG.REDIS_PORT,
    host: REDIS_CONFIG.REDIS_HOST,
    keyPrefix: REDIS_CONFIG.REDIS_KEY_PREFIX,
    password: REDIS_CONFIG.REDIS_PASSWORD,
})
redis.on('connect', () => {
    printTime('redis 已连接')
})