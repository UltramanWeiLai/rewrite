
import genCommonConfig from './common'

const genDevConfig = () => {
    const { input, output, plugins, external, globals } = genCommonConfig()

    return {
        input,
        output,
        external,
        globals,
        plugins
    }
}

export default genDevConfig
