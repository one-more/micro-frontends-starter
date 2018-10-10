// @flow

import {getStorage, storageKeys} from "./storage";

const propsStorage = getStorage(storageKeys.PROPS);
const eventsStorage = getStorage(storageKeys.EVENTS);

export function clearPropsStorage(): void {
    for (const key of propsStorage.keys()) {
        if (!document.contains(key)) {
            propsStorage.delete(key)
        }
    }
}

export function clearEventsStorage(): void {
    for (const key of eventsStorage.keys()) {
        if (!document.contains(key)) {
            eventsStorage.delete(key)
        }
    }
}