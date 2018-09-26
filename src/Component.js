// @flow

import {subscribe} from "./store"

function render() {
    if (this.isShadow) {
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = this.render()
    } else {
        this.innerText = this.render()
    }
}

export default class Component extends HTMLElement {
    get name() {
        return Object.getPrototypeOf(this).constructor.name
    }

    get isShadow() {
        return true
    }

    get props() {
        return this.attributes
    }

    get keys() {
        return []
    }

    subscriptions = [];

    state = {};

    constructor() {
        super();

        render.call(this);
    }

    render() {
        return ''
    }

    connectedCallback() {
        for (const key of this.keys) {
            this.subscriptions.push(
                subscribe(key, state => {
                    this.state[key] = state;
                    render.call(this)
                })
            )
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
        this.adopted()
    }

    adopted() {}

    attributeChangedCallback(attributeName: string, oldValue: string, newValue: string) {
        this.propsChanged(
            {
                ...this.props,
                [attributeName]: newValue,
            }
        )
    }

    propsChanged(newProps: Object) {}
}