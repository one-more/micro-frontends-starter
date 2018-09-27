// @flow

interface Reducer {
    state: any,
    actions: {
        [key: string]: Function
    }
}

interface Store {
    addReducer(key: string, reducer: Reducer): void,
    removeReducer(key: string): boolean,
    subscribe(key: string, cb: Function): {unsubscribe: Function},
    getState(key: string): any
}

const stubImplementation: Store = {
    addReducer(key: string, reducer: Reducer) {},
    removeReducer(key: string) {
        return false;
    },
    subscribe(key: string, cb: Function) {
        return {
            unsubscribe() {}
        }
    },
    getState(key: string) {}
};

const store = {
    currentImplementation: stubImplementation
};

export const setImplementation = (implementation: Store) => {
    store.currentImplementation = implementation
};

export const registerReducer = (key: string, reducer: Reducer) => {
    store.currentImplementation.addReducer(key, reducer)
};
export const removeReducer = (key: string) => {
    store.currentImplementation.removeReducer(key)
};
export const subscribe = (key: string, cb: Function) => {
    return store.currentImplementation.subscribe(key, cb)
};
export const getState = (key: string) => {
    return store.currentImplementation.getState(key)
};