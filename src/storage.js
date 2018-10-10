// @flow

import type {StorageDriver} from "./interfaces";

const propsMap: Map<any, any> = new Map;

const eventsMap: Map<any, any> = new Map;

export const storageKeys = {
    PROPS: "props",
    EVENTS: "events"
};

const driver: StorageDriver = {
    items: Object.create({
        [storageKeys.PROPS]: propsMap,
        [storageKeys.EVENTS]: eventsMap,
    }),
    setItem(key: string, value: any) {
        this.items[key] = value
    },
    getItem(key: string) {
        return this.items[key]
    },
    removeItem(key: string) {
        delete this.items[key]
    },
    migrate(driver: StorageDriver) {
        for (const key in this.items) {
            driver.setItem(
                key,
                this.items[key]
            )
        }
        return driver
    }
};

export const storage = {
    driver
};

export function setStorageDriver(driver: StorageDriver): void {
    storage.driver = storage.driver.migrate(driver)
}

export function getStorage(key: string): any {
    return storage.driver.getItem(key)
}

export function addStorage(key: string, value: any): void {
    storage.driver.setItem(key, value)
}

export function removeStorage(key: string): void {
    storage.driver.removeItem(key)
}