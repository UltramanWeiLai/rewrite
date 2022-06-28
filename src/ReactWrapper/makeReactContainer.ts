import { useCallback, createElement } from 'react'
import { defineComponent, h } from 'vue'
import VueWrapper from '../VueWrapper/index'

const makeReactContainer = (Component: any) => {

    return (props: any) => {
        const { children } = props

        const wrapVueChildren = useCallback((children: any) => {
            return defineComponent({
                render() {
                    return h('div', children)
                }
            })
        }, [])
        
        const Children = children && createElement(VueWrapper, { component: wrapVueChildren(children) })
        return createElement(Component, props, Children)
    }
}

export default makeReactContainer
