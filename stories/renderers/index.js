// @flow

import {Component, props, addStorage, getStorage} from "../../dist/main";
import {hyper} from "hyperhtml"
import {html, render as renderLit} from "lit-html"
import Vue from "vue/dist/vue.esm.js"

export {reactRenderer} from "./react-renderer"

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
        get html() {
            return html
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
                    data: {...this, attributes: this.props},
                    methods: {
                        props
                    }
                })
            } else {
                this.vue.state = this.state;
                this.vue.attributes = this.props;
            }
        }
    }
}