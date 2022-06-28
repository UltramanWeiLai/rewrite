import { useCallback, useEffect, useRef, createElement, FC } from "react"
import { App, createApp, defineComponent, h } from "vue"
import ReactWrapper from "../ReactWrapper/index"

interface VueWrapperProps {
    component: any
}

const VueWrapper: FC<VueWrapperProps> = (props) => {
    const { component } = props
    const instance = useRef<App<Element>>()
    const options = useRef(defineComponent({
        data: () => props,
        components: {
            'internal-component-name': component,
            'vuera-internal-react-wrapper': ReactWrapper,
        },
        render() {
            return h(
                'internal-component-name',
                {
                    props: this.$data,
                    attrs: this.$attrs,
                },
                h('internal-react-wrapper', {
                    props: {
                        component: () => createElement('div', {}),
                    },
                })
            )
        }
    }))

    const createVueInstance = useCallback((targetElement: Element | null) => {
        instance.current = createApp(options.current)
        instance.current.mount(targetElement as Element)
    }, [])

    useEffect(() => {
        options.current?.components?.['internal-component-name'] && (options.current.components['internal-component-name'] = component)
        options.current?.$forceUpdate()
    }, [component])

    return createElement('div', { ref: createVueInstance })
} 

export default VueWrapper
