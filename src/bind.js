// @flow

import {addStorage, getStorage} from "./storage"

const KEY = "BOUNDS";
const MAX_STORAGE_SIZE = 100;

addStorage(
    KEY,
    new Map()
);

function appendToStorage(fn: Function, value: Map<any, Function>): void {
    const storage: Map<Function, Map<any, Function>> = getStorage(KEY);
    if (storage.size === MAX_STORAGE_SIZE) {
        const keys = storage.keys();
        // $FlowFixMe
        storage.delete(keys.next().value);
    }
    storage.set(fn, value)
}

export function bind(fn: Function, ...args: any[]): Function {
    const storage: Map<Function, Map<any, Function>> = getStorage(KEY);
    const bound = storage.get(fn);
    const firstArg = args[0];
    const boundFn = fn.bind(null, ...args);
    if (bound) {
        if (!bound.get(firstArg)) {
            bound.set(
                firstArg,
                boundFn
            );
            return boundFn
        }
        // $FlowFixMe
        return bound.get(firstArg)
    }

    const fnMap = new Map();
    fnMap.set(
        firstArg,
        boundFn
    );
    appendToStorage(
        fn,
        fnMap
    );
    return boundFn
}