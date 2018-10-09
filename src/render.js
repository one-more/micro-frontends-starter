// @flow

import {isCustomComponent} from "./web-components"

function nodeEquals(elementNode: Node, fragmentNode: Node): boolean {
    const elClone = elementNode.cloneNode(false);
    const frClone = fragmentNode.cloneNode(false);
    return elClone.isEqualNode(frClone)
}

function contentDiffer(elementNode: Node, fragmentNode: Node): boolean {
    return elementNode.isEqualNode(fragmentNode) === false
}

function childrenChangedCount(elementNode: Node, fragmentNode: Node): number {
    if (elementNode.childNodes.length > fragmentNode.childNodes.length) {
        return fragmentNode.childNodes.length
    }
    let changed = 0;
    for (let i = 0; i < elementNode.childNodes.length; i++) {
        const elClone = elementNode.childNodes[i].cloneNode(false);
        const frClone = fragmentNode.childNodes[i].cloneNode(false);
        if (!nodeEquals(elementNode.childNodes[i], fragmentNode.childNodes[i])) {
            if (!isEmptyNode(elClone) && !isEmptyNode(frClone)) {
                changed++
            }
        }
    }
    return changed
}

function appendChildren(elementNode: Node, fragmentNode: Node): void {
    const fragment = document.createDocumentFragment();
    for (let i = elementNode.childNodes.length; i< fragmentNode.childNodes.length; i++) {
        fragment.appendChild(
            fragmentNode.childNodes[i]
        )
    }
    elementNode.appendChild(
        fragment
    )
}

function updateAttributes(elementNode: Node, fragmentNode: Node): void {
    const attributes = (fragmentNode: any).attributes || [];
    const elementAttributes = (elementNode: any).attributes || [];
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
    if (!nodeEquals(elementNode, fragmentNode)) {
        if (isCustomComponent(elementNode)) {
            return updateAttributes(
                elementNode,
                fragmentNode
            )
        }
        updateAttributes(
            elementNode,
            fragmentNode
        )
    }
    updateChildren(
        elementNode,
        fragmentNode
    )
}

function isEmptyNode(node: Node): boolean {
    if (node.childNodes.length) {
        return false
    }
    if (node.innerText) {
        return Boolean(node.innerText.trim()) === false
    }
    if ((node: any).innerHTML) {
        return Boolean((node: any).innerHTML.trim()) === false
    }
    if ((node: any).textContent) {
        return Boolean((node: any).textContent.trim()) === false
    }
    return true
}

function nodeFilter(node: Node): boolean {
    if (node) {
        return (node.nodeType === Node.ELEMENT_NODE ||
            node.nodeType === Node.TEXT_NODE) &&
            node.nodeName !== "STYLE" &&
            !isEmptyNode(node)
    }
    return false
}

function updateChildren(elementNode: Node, fragmentNode: Node): void {
    if (elementNode.childNodes.length !== fragmentNode.childNodes.length) {
        if (childrenChangedCount(elementNode, fragmentNode) > 0) {
            return (elementNode.parentNode: any).replaceChild(
                fragmentNode,
                elementNode,
            );
        }
        return appendChildren(elementNode, fragmentNode)
    }
    if (elementNode.childNodes.length === 0 && fragmentNode.childNodes.length === 0) {
        if (contentDiffer(elementNode, fragmentNode)) {
            return (elementNode.parentNode: any).replaceChild(
                fragmentNode,
                elementNode,
            );
        }
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
    if (this.isShadow && !this.shadowRoot) {
        this.attachShadow({mode: 'open'});
    }
    const renderRes = this.render();
    const root = this.isShadow ? (this.shadowRoot: any) : this;
    const fragment = typeof renderRes === "string" ? createFragmentFromStr(renderRes) : renderRes;
    if (!this.mounted) {
        root.innerHTML = `<style>${this.styles}</style>`;
        root.appendChild(fragment.content);
        this.mounted = true;
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
}