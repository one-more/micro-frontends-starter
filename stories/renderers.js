// @flow

import {Component, props, addStorage, getStorage} from "../dist/main";
import {render} from "react-dom"
import {hyper} from "hyperhtml"
import {html, render as renderLit} from "lit-html"
import Vue from "vue/dist/vue.esm.js"

const PROXY_LISTENERS = "PROXY_LISTENERS";

addStorage(PROXY_LISTENERS, new WeakMap);

function ensureListeners(root: HTMLElement, vDom: Object, storage: Object) {
    for (const key in vDom.props) {
        if (key.slice(0,2) === "on") {
            ensureListener(root, key, storage)
        }
        if (key === "children" && Array.isArray(vDom.props.children)) {
            vDom.props.children.map(child => ensureListeners(root, child, storage))
        }
    }
}

function ensureListener(root: HTMLElement, key: string, storage: Object) {
    const forRoot = storage.get(root);
    if (!forRoot.get(key)) {
        root.addEventListener(
            key.toLowerCase().slice(2),
            proxyListener()
        );
        forRoot.set(
            key,
            1
        )
    }
}

function proxyListener() {
    return (event: Event) => {
        const type = `on${event.type}`;
        for (const key in event.target) {
            if (key.includes("reactEventHandlers")) {
                const props = (event.target: any)[key];
                for (const prop in props) {
                    if (prop.toLowerCase() === type) {
                        props[prop](event)
                    }
                }
            }
        }
    }
}

export function reactRenderer(Wrapped: Class<Component>) {
    return class extends Wrapped {
        insertContent(root: HTMLElement, content: any) {
            const storage = getStorage(PROXY_LISTENERS);
            if (!storage.get(root)) {
                storage.set(
                    root,
                    new Map()
                )
            }
            ensureListeners(
                root,
                content,
                storage
            );
            render(
                content,
                root
            )
        }
    }
}

export function hyperRenderer(Wrapped: Class<Component>) {
    return class extends Wrapped {
        get html() {
            return hyper(this.root)
        }
        insertContent() {}
    }
}

export function litRenderer(Wrapped: Class<Component>) {
    return class extends Wrapped {
        constructor() {
            super();

            this.html = html;
        }

        insertContent(root: HTMLElement, content: any) {
            renderLit(
                content,
                root
            )
        }
    }
}

export function vueRenderer(Wrapped: Class<Component>) {
    return class extends Wrapped {
        insertContent(root: HTMLElement, content: any) {
            if (!this.mounted) {
                this.vue = new Vue({
                    el: root,
                    template: content,
                    data: {...this},
                    methods: {
                        props
                    }
                })
            } else {
                this.vue.state = this.state;
            }
        }
    }
}