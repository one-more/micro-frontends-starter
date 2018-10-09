// @flow

import type {WebComponents as Implementation} from "./interfaces"

const defaultImplementation: Implementation = {
    registerComponent(name: string, component: Class<Element>) {
        if ('customElements' in window) {
            customElements.define(name, component);
        } else {
            currentReadyCheck().then(() => {
                registerComponent(name, component)
            })
        }
    },
    isCustomComponent(node: Node) {
        return node.nodeName.includes("-")
    }
};

let currentImplementation = defaultImplementation;

const registerComponent = (name: string, component: Class<Element>) => {
    return currentImplementation.registerComponent(name, component);
};

export const setImplementation = (implementation: Implementation) => {
    currentImplementation = implementation;
};

let currentReadyCheck = () => Promise.resolve();

export const componentsReady = () => {
    return currentReadyCheck()
};

export const setReadyCheck = (readyCheck: Function) => {
    currentReadyCheck = readyCheck;
};

export default registerComponent;

export const isCustomComponent = (node: Node) => {
    return currentImplementation.isCustomComponent(node)
};