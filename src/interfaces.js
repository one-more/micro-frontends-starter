// @flow

export interface Component {
    get isShadow(): boolean,
    get styles(): string,
    mounted: boolean,
    render(): string,
}

export interface TemplateHandler {
    call(node: Node, args: any[]): void
}

export interface WebComponents {
    registerComponent(name: string, component: Function): void,
    isCustomComponent(node: Node): boolean
}

export interface StorageDriver {
    setItem(key: string, value: any): void,
    getItem(key: string): any,
    removeItem(key: string): void,
    migrate(driver: StorageDriver): StorageDriver
}

export interface Reducer {
    state: any,
    actions: {
        [key: string]: Function
    }
}

export interface Store {
    addReducer(key: string, reducer: Reducer): void,
    removeReducer(key: string): boolean,
    subscribe(key: string, cb: Function): {unsubscribe: Function},
    getState(key: string): any,
    migrate(newStore: Store): Store
}