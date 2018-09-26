// @flow

interface Implemetation {
    registerComponent(name: string, component: Function): void,
}

const defaultImplementation: Implemetation = {
    registerComponent(name: string, component: Function) {
        customElements.define(name, component);
    }
};

let currentImplementation = defaultImplementation;

const registerComponent = (name: string, component: Function) => {
    return currentImplementation.registerComponent(name, component);
};

export const setImplementation = (implementation: Implemetation) => {
    currentImplementation = implementation;
};

let currentReadyCheck = () => {
    if ('customElements' in window) {
        return Promise.resolve()
    }
    return new Promise<null>((resolve: Function) => {
        require("@webcomponents/custom-elements").then(() => {
            window.addEventListener('WebComponentsReady', resolve);
        })
    })
};

export const componentsReady = () => {
    return currentReadyCheck()
};

export const setReadyCheck = (readyCheck: Function) => {
    currentReadyCheck = readyCheck;
};

export default registerComponent;