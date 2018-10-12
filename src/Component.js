// @flow

import {subscribe, getState} from "./store"
import {render} from "./render"
import {getStorage, storageKeys} from "./storage"
import {clearEventsStorage, clearPropsStorage} from "./utils";

const propsStorage = getStorage(storageKeys.PROPS);

function parseAttributes(attributes: NamedNodeMap): Object {
    const result = {};
    for (const attribute of attributes) {
        result[attribute.name] = attribute.value;
    }
    return result;
}

export default class Component extends HTMLElement {
    get name() {
        return Object.getPrototypeOf(this).constructor.name
    }

    get isShadow(): boolean {
        return true
    }

    get props() {
        return {
            ...this.__defaultProps,
            ...parseAttributes(this.attributes),
            ...(propsStorage.get(this) || {})
        }
    }

    set props(props: Object) {
        this.__defaultProps = props;
    }

    get keys() {
        return []
    }

    get styles(): string {
        return ""
    }

    static get observedAttributes(): string[] {
        return this.observableProps.map((prop: string): string => {
            let res = "";
            for (let i = 0; i < prop.length; i++) {
                if (prop[i] === prop[i].toUpperCase()) {
                    res += "-"+prop[i].toLowerCase()
                } else {
                    res += prop[i]
                }
            }
            return res
        })
    }

    static get observableProps() {
        return []
    }

    __defaultProps = {};

    subscriptions = [];

    state = {};

    mounted = false;

    beforeRender() {}

    render() {
        return ''
    }

    afterRender() {}

    subscribeToStore() {
        for (const key of this.keys) {
            this.subscriptions.push(
                subscribe(key, state => {
                    this.state[key] = state;
                    render.call(this)
                })
            );
            this.state[key] = getState(key);
        }
    }

    connectedCallback() {
        this.subscribeToStore();
        render.call(this);

        this.connected()
    }

    connected() {}

    disconnectedCallback() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe()
        }
        clearPropsStorage();
        clearEventsStorage();

        this.disconnected()
    }

    disconnected() {}

    adoptedCallback() {
        this.subscribeToStore();
        render.call(this);

        this.adopted()
    }

    adopted() {}

    attributeChangedCallback(attributeName: string, oldValue: string, newValue: string) {
        if (this.mounted && oldValue != newValue) {
            this.propsChanged(
                {
                    ...this.props,
                    [attributeName]: newValue,
                }
            );
            render.call(this)
        }
    }

    propsChanged(newProps: Object) {}
}