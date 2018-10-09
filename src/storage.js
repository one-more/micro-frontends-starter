// @flow

const propsMap: Map<any, any> = new Map;

const eventsMap: Map<any, any> = new Map;

export const storageKeys = {
    PROPS: "props",
    EVENTS: "events"
};

export const storage = {
    [storageKeys.PROPS]: propsMap,
    [storageKeys.EVENTS]: eventsMap,
};

export function getStorage(key: string): any {
    return storage[key]
}

export function addStorage(key: string, value: any): void {
    storage[key] = value
}

export function removeStorage(key: string): void {
    delete storage[key]
}