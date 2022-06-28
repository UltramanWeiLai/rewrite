import path from 'path'

import del from 'rollup-plugin-delete'
import json from '@rollup/plugin-json'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import nodeResolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export const extensions = ['.js', '.ts']

const dist = path.resolve(__dirname, './dist')
const input = path.resolve(__dirname, './src/index.ts')
const tsconfig = path.resolve(__dirname, './tsconfig.json')

const genCommonConfig = () => ({
    input,
    output: {},
    external: ['vue', 'react', 'react-dom'],
    globals: {
        vue: 'Vue',
        react: 'React',
        'react-dom': 'ReactDOM',
    },
    plugins: [
        peerDepsExternal(), // 打包结果不包含 package.json 的 peerDependencies
        json({
            compact: true,
            indent: '   ',
            preferConst: true,
        }),
        typescript({
            clean: true,
            tsconfig,
        }),
        nodeResolve({
            browser: true, // 重要
            // mainFields: format === 'esm' ? ['module', 'main'] : ['main'],
            extensions,
        }),
        commonjs(),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            preventAssignment: true,
        }),
        // del({ targets: dist }),
    ]
})

export default genCommonConfig
