// @flow

import {Component, props} from "../dist/main";
import {render} from "react-dom"
import {hyper} from "hyperhtml"
import {html, render as renderLit} from "lit-html"
import Vue from "vue/dist/vue.esm.js"

export function reactRenderer(Wrapped: Class<Component>) {
    return class extends Wrapped {
        insertContent(root: HTMLElement, content: any) {
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
            const proxy = new Proxy(this, {
                get: (obj, prop) => {
                    return obj[prop]
                }
            });
            new Vue({
                el: root,
                template: content,
                data: {...this},
                methods: {
                    props
                }
            })
        }
    }
}