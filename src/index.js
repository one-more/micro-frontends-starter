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

export {
    default as html,
    addTemplateHandler,
    setEventsHandler,
    unloadHandler,
    accessHandler
} from "./tag"

export {default as Component} from "./Component"
