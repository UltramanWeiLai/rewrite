import { defineComponent, h } from "vue"
import ReactWrapper from "../ReactWrapper/index"

/**
 * @description Creates a Vue component that renders a React component.
 * @param component - The React component to render.
 * @returns A Vue component that renders the React component.
*/
const VueResolver = (component: any) => {
    return defineComponent({
        inheritAttrs: false,
        setup(props, ctx) {
            return () => h(
                ReactWrapper,
                {
                    component: component,
                    ...props,
                    ...ctx.attrs,
                },
                ctx.slots.default
            )
        }
    })
}

export default VueResolver
