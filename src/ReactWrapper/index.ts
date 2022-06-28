import { createElement } from "react"
import ReactDOM from 'react-dom/client';
import { defineComponent, h, onMounted, ref } from "vue"
import makeReactContainer from "./makeReactContainer"

/**
 * @description Creates a Vue component that renders a React component.
*/
export default defineComponent({
    props: ['component'],
    setup(props, ctx) {
        const react = ref()
        const reactInstance = ref()
        const { component } = props

        const setReactRef = (ref: any) => {
            react.value = ref
        }

        onMounted(() => {
            const Component = makeReactContainer(component)
            reactInstance.value = ReactDOM.createRoot(react.value)
            reactInstance.value.render(createElement(Component, { ...props, ...ctx.attrs, ref: setReactRef }, null))
        })

        return () => h('div', { ref: react })
    },
})
