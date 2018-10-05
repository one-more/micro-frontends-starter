// @flow

import {isCustomComponent} from "./web-components"

function updateAttributes(elementNode: Node, fragmentNode: Node): void {
    const attributes = (fragmentNode: any).attributes;
    const elementAttributes = (elementNode: any).attributes;
    if (elementAttributes.length > attributes.length) {
        for (let i = 0; i < elementAttributes.length; i++) {
            const attribute = elementAttributes[i];
            if (!(fragmentNode: any).hasAttribute(attribute.nodeName)) {
                (elementNode: any).removeAttribute(
                    attribute.nodeName
                )
            }
        }
    }
    for (let i = 0; i < attributes.length; i++) {
        const attribute = attributes[i];
        (elementNode: any).setAttribute(
            attribute.nodeName,
            attribute.nodeValue
        );
    }
}

function updateElement(elementNode: Node, fragmentNode: Node): void {
    const elClone = elementNode.cloneNode(false);
    const frClone = fragmentNode.cloneNode(false);
    if (!elClone.isEqualNode(frClone)) {
        if (isCustomComponent(elementNode)) {
            return updateAttributes(
                elementNode,
                fragmentNode
            )
        }
        return (elementNode.parentNode: any).replaceChild(
            fragmentNode,
            elementNode,
        );
    }
    updateChildren(
        elementNode,
        fragmentNode
    )
}

function nodeFilter(node: Node): boolean {
    if (node) {
        return (node.nodeType === Node.ELEMENT_NODE ||
            node.nodeType === Node.TEXT_NODE) &&
            node.nodeName !== "STYLE"
    }
    return false
}

function updateChildren(elementNode: Node, fragmentNode: Node): void {
    if (elementNode.childNodes.length !== fragmentNode.childNodes.length) {
        return (elementNode.parentNode: any).replaceChild(
            fragmentNode,
            elementNode,
        );
    }
    const elementNodes = Array.from(elementNode.childNodes).filter(nodeFilter);
    const fragmentNodes = Array.from(fragmentNode.childNodes).filter(nodeFilter);
    for (let i = 0; i < elementNodes.length; i++) {
        updateElement(
            elementNodes[i],
            fragmentNodes[i]
        )
    }
}

function createFragmentFromStr(tpl: string): HTMLTemplateElement {
    const template = document.createElement("template");
    template.innerHTML = tpl;
    return template
}

export function render() {
    if (this.isRendering) {
        return
    }
    this.isRendering = true;

    if (this.isShadow && !this.shadowRoot) {
        this.attachShadow({mode: 'open'});
    }
    const renderRes = this.render();
    const root = this.isShadow ? (this.shadowRoot: any) : this;
    const fragment = typeof renderRes === "string" ? createFragmentFromStr(renderRes) : renderRes;
    if (!this.mounted) {
        this.mounted = true;
        root.innerHTML = `<style>${this.styles}</style>`;
        root.appendChild(fragment.content);
    } else {
        const style = document.createElement("style");
        style.innerHTML = this.styles;
        fragment.content.insertBefore(
            style,
            fragment.content.firstChild
        );
        updateChildren(
            root,
            fragment.content
        )
    }

    this.isRendering = false;
}