import createRollupConfig, { IS_PRD } from './build/create-rollup-config'
import pkg from './package.json'

const esmConfig = createRollupConfig({
    output: {
        file: pkg.module,
        format: 'esm',
        name: pkg.name,
    },
})

const umdConfig = createRollupConfig({
    output: {
        file: pkg.main,
        format: 'umd',
        name: pkg.name,
    },
})

export default [esmConfig, umdConfig]
