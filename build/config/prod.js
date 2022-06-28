
import babel from '@rollup/plugin-babel'
import cleanup from 'rollup-plugin-cleanup'
import { terser } from 'rollup-plugin-terser'

import genCommonConfig, { extensions } from "./common"

const genProdConfig = (format) => {
    const { input, output = {}, plugins = [], external, globals } = genCommonConfig(format)

    return {
        input,
        output: {
            sourcemap: true,
            ...output,
        },
        external,
        globals,
        plugins: [
            ...plugins,
            babel({
                rootMode: 'upward',
                babelHelpers: 'runtime',
                include: 'src/**',
                extensions,
            }),
            cleanup({
                comments: 'none',
                extensions,
            }),
            terser(),
        ]
    }

}

export default genProdConfig
