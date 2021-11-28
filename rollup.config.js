import { upperFirst, camelCase } from 'lodash'
import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import json from '@rollup/plugin-json'
import analyzer from 'rollup-plugin-analyzer'
import { dependencies, peerDependencies, name } from './package.json'

const external = []// 'rate-limit-redis' Object.keys({ ...dependencies, ...peerDependencies }) // 默认不打包 dependencies, peerDependencies
const outputName = upperFirst(camelCase(name))// 导出的模块名称 PascalCase
const env = process.env
const __PROD__ = env.NODE_ENV === 'production'
const __DEV__ = env.NODE_ENV === 'development'
const __ANALYZER__ = Boolean(env.ANALYZER)
function getPlugins({ isBrowser = false, isMin = false, isDeclaration = false }) {
    const plugins = []
    plugins.push(
        nodeResolve({
            browser: isBrowser,
            preferBuiltins: true,
        }),
    )
    plugins.push(
        typescript({
            tsconfig: 'tsconfig.json',
            module: 'esnext',
            target: 'es2019', // node >= 12
            esModuleInterop: true,
            allowSyntheticDefaultImports: true,
            declaration: isDeclaration,
            sourceMap: true,
            importHelpers: false,
        }),
    )
    plugins.push(
        commonjs({
            sourceMap: false,
        }),
    )
    plugins.push(
        json({}),
    )
    if (isMin) {
        plugins.push(
            terser({
                module: true,
            }),
        )
    }
    if (__ANALYZER__) {
        plugins.push(
            analyzer({

            }),
        )
    }
    return plugins
}

export default defineConfig([
    {
        input: 'src/bin/www.ts',
        external,
        output: {
            file: 'dist/index.js', // 生成 cjs
            format: 'cjs',
            name: outputName,
            sourcemap: true,
        },
        plugins: getPlugins({
            isBrowser: false,
            isDeclaration: false,
            isMin: false,
        }),
    },
])
