// @flow

import {subscribe, getState} from "./store"
import {render} from "./render-queue"
import {propsMap} from "./tag"

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
            ...(propsMap.get(this) || {})
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

    __defaultProps = {};

    subscriptions = [];

    state = {};

    constructor() {
        super();

        this.subscribeToStore();
        render.call(this)
    }

    render() {
        return ''
    }

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
        this.connected()
    }

    connected() {}

    disconnectedCallback() {
        for (const subscription of this.subscriptions) {
            subscription.unsubscribe()
        }

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
        this.propsChanged(
            {
                ...this.props,
                [attributeName]: newValue,
            }
        );
        render.call(this)
    }

    propsChanged(newProps: Object) {}
}