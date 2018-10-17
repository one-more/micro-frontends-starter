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
    css
} from "./tag"

export {
    getStorage,
    addStorage,
    removeStorage,
    setStorageDriver
} from "./storage"

export {bind} from "./bind"

export {
    matchTagArg,
    replaceTagArg
} from "./utils"

export {
    default as Component,
    connect,
    define,
    props,
} from "./Component"
