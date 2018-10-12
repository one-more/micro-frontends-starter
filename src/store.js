// @flow

import type {Store, Reducer} from "./interfaces"

const stubImplementation: Store = {
    reducers: {},
    subscriptions: {},
    addReducer(key: string, reducer: Reducer) {
        this.reducers[key] = reducer;
    },
    removeReducer(key: string) {
        delete this.reducers[key];
        return false;
    },
    subscribe(key: string, cb: Function) {
        if (!this.subscriptions[key]) {
            this.subscriptions[key] = [];
        }
        this.subscriptions[key].push(cb);
        return {
            unsubscribe: () => {
                this.subscriptions[key] = this.subscriptions[key].filter(el => el !== cb)
            }
        }
    },
    getState(key: string) {
        return this.reducers[key]
    },
    migrate(newStore: Store) {
        for (const key in this.reducers) {
            const reducer = this.reducers[key];
            newStore.addReducer(key, reducer);
        }
        for (const key in this.subscriptions) {
            for (const subscription of this.subscriptions[key]) {
                newStore.subscribe(key, subscription)
            }
        }
        return newStore;
    }
};

const store = {
    currentImplementation: stubImplementation
};

export const setImplementation = (implementation: Store) => {
    store.currentImplementation = store.currentImplementation.migrate(implementation)
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