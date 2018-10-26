// @flow

import registerComponent from "./web-components"
import {subscribe, getState} from "./store"
import {render} from "./render"
import {getStorage, storageKeys} from "./storage"
import {compose, not, parseAttributes, propNameToTag} from "./utils";
import {html, css} from "./tag"
import shallowEqual from "./shallow-equals";

const propsStorage = getStorage(storageKeys.PROPS);

const PROPS_ID = "props-id";

export default class Component extends HTMLElement {
    get name() {
        return Object.getPrototypeOf(this).constructor.name
    }

    get isShadow(): boolean {
        return true
    }

    get props() {
        const attributes: Object = parseAttributes(this.attributes);
        const id = Number(attributes.propsId);
        return {
            ...this.__defaultProps,
            ...attributes,
            ...(propsStorage.get(id) || {})
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
        return this.observableProps.map(propNameToTag).concat(PROPS_ID)
    }

    static get observableProps() {
        return []
    }

    __defaultProps = {};

    subscriptions = [];

    state = {};

    mounted = false;

    get html() {
        return html
    }

    css = css;

    root: HTMLElement;

    beforeRender() {}

    render(): string | void {
        return ''
    }

    insertContent(root: HTMLElement, content: string): void {
        if (typeof content === "string") {
            root.innerHTML = content
        } else {
            throw new Error("default renderer can handle only strings")
        }
    }

    afterRender() {}

    subscribeToStore() {
        for (const key of this.keys) {
            this.subscriptions.push(
                subscribe(key, state => {
                    this.state = state;
                    render.call(this)
                })
            );
            this.state = getState(key);
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
        if (this.mounted && oldValue !== newValue) {
            this.propsChanged(
                {
                    ...this.props,
                    [attributeName]: newValue,
                }
            );
            if (attributeName === PROPS_ID) {
                const oldProps = propsStorage.get(Number(oldValue));
                const newProps = propsStorage.get(Number(newValue));
                if (this.shouldComponentUpdate(oldProps, newProps)) {
                    propsStorage.delete(oldValue);
                    render.call(this)
                }
            } else {
                render.call(this)
            }
        }
    }

    propsChanged(newProps: Object) {}

    shouldComponentUpdate = compose(
        not,
        shallowEqual,
    );
}

export function connect(key: string) {
    return (Wrapped: Class<Component>) => {
        return class extends Wrapped {
            get keys() {
                return [key]
            }
        }
    }
}

export function define(name: string) {
    return (Wrapped: Class<Component>) => {
        registerComponent(name, Wrapped);
        return Wrapped
    }
}

let propsId = 0;

export function props(props: Object) {
    const id = propsId++;
    propsStorage.set(
        id,
        props
    );
    return {
        toString() {
            return `${PROPS_ID}="${id}"`
        },
        [PROPS_ID]: id,
    }
}