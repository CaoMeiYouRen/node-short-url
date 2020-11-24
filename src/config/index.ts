import dotenv from 'dotenv'
import path from 'path'
import fs from 'fs-extra'
const modes = [
    '.env.local',
    '.env',
]
let envParsed = {}
for (let i = 0; i < modes.length; i++) {
    const mode = modes[i]
    const result = dotenv.config({ path: mode })
    if (result.parsed) {
        envParsed = Object.assign(result.parsed, envParsed)
    }
}
if (process.env.NODE_ENV === 'development') {
    console.log(envParsed)
}
const env = process.env

/**
 * 是否为debug
 */
export const IS_DEBUG = env.NODE_ENV === 'development'

export const PORT = Number(env.PORT || 5000)

export const ROOT_URL = env.ROOT_URL || '/'

export const BASE_URL = (env.BASE_URL || 'http://localhost:5000') + ROOT_URL

export const TIMEOUT = Number(env.TIMEOUT || 5000)

/**
 * 限流配置
 */
export const LIMIT = {
    LIMIT_INTERVAL: Number(env.LIMIT_INTERVAL || 60),
    LIMIT_MAX: Number(env.LIMIT_MAX || 30),
}
const REDIS_PORT = Number(env.REDIS_PORT || 6379)
const REDIS_HOST = env.REDIS_HOST || '127.0.0.1'
/**
 * redis配置
 */
export const REDIS_CONFIG = {
    REDIS_URL: env.REDIS_URL || `redis://${REDIS_HOST}:${REDIS_PORT}`,
    REDIS_PORT,
    REDIS_HOST,
    REDIS_PASSWORD: env.REDIS_PASSWORD || '',
    REDIS_KEY_PREFIX: env.REDIS_KEY_PREFIX || 'my-redis',
}