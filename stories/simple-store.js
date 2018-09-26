export const store = {
    reducers: {},
    actions: {},
    listeners: {},
    addReducer(key: string, reducer) {
        this.reducers[key] = reducer.state;
        const actions = reducer.actions;
        for (const i in actions) {
            const action = actions[i];
            actions[i] = (...args) => {
                this.reducers[key] = action(
                    this.reducers[key],
                    ...args
                );
                for (const cb of this.listeners[key]) {
                    cb(
                        {
                            ...this.reducers[key],
                            ...actions,
                        }
                    )
                }
            }
        }
        this.actions[key] = actions;
    },
    removeReducer(key: string) {
        delete this.reducers[key];
        delete this.actions[key];
    },
    subscribe(key: string, cb: Function) {
        if (!this.listeners[key]) {
            this.listeners[key] = []
        }
        this.listeners[key].push(cb);
        return {
            unsubscribe() {
                this.listeners[key] = this.listeners[key].filter(el => el !== cb)
            }
        }
    }
};