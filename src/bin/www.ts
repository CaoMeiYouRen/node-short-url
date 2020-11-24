import debug from 'debug'
import http from 'http'
import path from 'path'
import colors from 'colors'
import moduleAlias from 'module-alias'
moduleAlias.addAlias('@', path.join(__dirname, '../'))
import { Server } from '../app'
import { printTime } from '@/utils'
import { PORT } from '@/config'

const iDebugger = debug('express:server')

const httpPort = PORT

const app = new Server().app

const httpServer = http.createServer(app)

httpServer.on('error', onError)
httpServer.on('listening', onListening)
httpServer.listen(httpPort)

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any): void {
    if (error.syscall !== 'listen') {
        throw error
    }
    const bind = typeof httpPort === 'string'
        ? `Pipe ${httpPort}`
        : `Port ${httpPort}`

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`)
            process.exit(1)
        // eslint-disable-next-line no-fallthrough
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`)
            process.exit(1)
        // eslint-disable-next-line no-fallthrough
        default:
            throw error
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening(): void {
    printTime(`运行端口为  http://127.0.0.1:${httpPort}`)
}
process.on('uncaughtException', err => {
    console.error(err)
})
process.on('unhandledRejection', (reason: any, p) => {
    console.error('Unhandled Rejection at: ', p)
})