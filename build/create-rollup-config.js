import genDevConfig from './config/dev.js'
import genProdConfig from './config/prod.js'

// 环境变量
const ENV = process.env.NODE_ENV || 'production'
const IS_SIZE_STATS = ENV.indexOf('size_stats') >= 0 // 分析包体积
export const IS_DEV = ENV.indexOf('development') >= 0
export const IS_PRD = ENV.indexOf('production') >= 0

const createRollupConfig = (config) => {
    const { input, output = {}, plugins = [] } = config
    const { format } = output
    const baseConfig = IS_PRD ? genProdConfig(format) : genDevConfig(format)

    if (IS_SIZE_STATS) {
        // 分析包体积。运行之后可查看 package 下的 `stats.html`
        baseConfig.plugins.push(visualizer())
    }

    input && (baseConfig.input = input)
    output && (baseConfig.output = { ...baseConfig.output, ...output })
    plugins && (baseConfig.plugins = [...baseConfig.plugins, ...plugins])

    return baseConfig
}

export default createRollupConfig
