import { isValidElement, createElement } from 'react'

import VueWrapper from '../VueWrapper/index'

const ReactResolver = (component: any) => {
    if (isValidElement(component)) return component

    return (props: any) => {
        return createElement(VueWrapper, { component, ...props })
    }
}

export default ReactResolver
