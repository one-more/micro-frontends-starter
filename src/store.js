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
    subscribe(key: string, cb: Function): {unsubscribe: Function}
}

let currentImplementation: Store = {
    addReducer(key: string, reducer: Reducer) {},
    removeReducer(key: string) {
        return false;
    },
    subscribe(key: string, cb: Function) {
        return {
            unsubscribe() {}
        }
    }
};

export const setImplementation = (implementation: Store) => {
    currentImplementation = implementation
};

export const registerReducer = (key: string, reducer: Reducer) => {
    currentImplementation.addReducer(key, reducer)
};
export const removeReducer = (key: string) => {
    currentImplementation.removeReducer(key)
};
export const subscribe = (key: string, cb: Function) => {
    return currentImplementation.subscribe(key, cb)
};