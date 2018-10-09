import {changeWebComponentsReadyCheck} from "./index"

changeWebComponentsReadyCheck(
    () => {
        if ('customElements' in window) {
            return Promise.resolve()
        }
        return new Promise<null>((resolve: Function) => {
            require("@webcomponents/custom-elements").then(() => {
                window.addEventListener('WebComponentsReady', resolve);
            })
        })
    }
);

export * from "./index"