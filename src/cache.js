export default class Cache {
    constructor() {
        this.store = new Map;
    }

    add(key: any, value: any): void {
        this.store.set(key, value)
    }

    get(key: any): void {
        return this.store.get(key)
    }

    remove(key: any): void {
        this.store.delete(key)
    }

    forEach(fn: Function): void {
        this.store.forEach(fn)
    }
}