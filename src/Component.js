// @flow

import {subscribe, getState} from "./store"

function render() {
    setTimeout(() => {
        if (this.isShadow && !this.shadowRoot) {
            this.attachShadow({mode: 'open'});
        }
        const render = this.render();
        if (this.isShadow) {
            (this.shadowRoot: any).innerHTML = render
        }
        else {
            this.innerHTML = render
        }
    })
}

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

    get isShadow() {
        return true
    }

    get props() {
        return {
            ...this.__defaultProps,
            ...parseAttributes(this.attributes),
        }
    }

    set props(props: Object) {
        this.__defaultProps = props;
    }

    get keys() {
        return []
    }

    __defaultProps = {};

    subscriptions = [];

    state = {};

    constructor() {
        super();

        this.subscribeToStore();
        if (this.isShadow) {
            render.call(this);
        }
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
        this.subscribeToStore();
        if (!this.isShadow) {
            render.call(this)
        }

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