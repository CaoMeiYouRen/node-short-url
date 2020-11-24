import morgan from 'morgan'
import path from 'path'
import fs from 'fs-extra'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import FileStreamRotator from 'file-stream-rotator'
import { timeFormat } from '@/utils'
const logDir = path.join(__dirname, '../../logs')
morgan.token('time', (req, res) => timeFormat(Date.now(), 'YYYY-MM-DD HH:mm:ss.SSSZ'))
morgan.format('app-combined', '[:time] :remote-addr - ":method :url HTTP/:http-version" :status - :response-time ms')
morgan.format('json', JSON.stringify({
    ip: ':remote-addr',
    method: ':method',
    url: ':url',
    http: ':http-version',
    status: ':status',
    'response-time': ':response-time',
    referrer: ':referrer',
    'user-agent': ':user-agent'
}))
const accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYY-MM-DD',
    filename: path.join(logDir, '%DATE%.log'),
    frequency: 'daily',
    verbose: false
})

export const logger = morgan('app-combined', { stream: accessLogStream })