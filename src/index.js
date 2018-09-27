// @flow

export {
    setImplementation as changeWebComponentsImplemenation,
    componentsReady,
    setReadyCheck as changeWebComponentsReadyCheck,
    default as registerComponent
} from "./web-components"

export {
    setImplementation as changeStoreImplementation,
    registerReducer,
    removeReducer,
    subscribe,
    getState
} from "./store"

export {default as Component} from "./Component"
