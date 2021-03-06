// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const env = process.env
const IS_DEBUG = env.NODE_ENV === 'development'
module.exports = {
    devtool: IS_DEBUG ? 'source-map' : '',
    mode: IS_DEBUG ? 'development' : 'production',
    entry: {
        build: path.join(__dirname, './src/bin/www.ts'),
    },
    target: 'node',
    output: {
        library: {
            root: 'NodeShortUrl',
            amd: 'node-short-url',
            commonjs: 'node-short-url',
        },
        libraryTarget: 'umd',
        path: path.join(__dirname, './dist'),
        filename: 'index.js',
    },
    externals: [],
    node: {
        // do not polyfill Buffer
        Buffer: false,
        __filename: false,
        __dirname: false,
    },
    plugins: [],
    module: {
        rules: [{
            test: /\.(ts|tsx)$/,
            use: 'ts-loader', // 配置加载typescript
            exclude: /node_modules/,
        }],
    },
    resolve: {
        // 路径别名
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
        // 路径别名自动解析确定的扩展
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
}