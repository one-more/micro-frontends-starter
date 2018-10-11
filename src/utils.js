// @flow

import {getStorage, storageKeys} from "./storage";

const propsStorage = getStorage(storageKeys.PROPS);
const eventsStorage = getStorage(storageKeys.EVENTS);

export function clearPropsStorage(): void {
    setTimeout(() => {
        for (const key of propsStorage.keys()) {
            if (!key.isConnected) {
                propsStorage.delete(key)
            }
        }
    })
}

export function clearEventsStorage(): void {
    setTimeout(() => {
        for (const key of eventsStorage.keys()) {
            if (!key.isConnected) {
                eventsStorage.delete(key)
            }
        }
    })
}

export function tagNameToProp(nodeName: string): string {
    return nodeName.split("-").reduce(
        (acc, next) => {
            if (next) {
                return acc + next[0].toUpperCase() + next.slice(1)
            }
            return acc
        }
    );
}