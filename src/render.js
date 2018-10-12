// @flow

import {isCustomComponent} from "./web-components"
import {getStorage, storageKeys} from "./storage"
import shallowEqual from "./shallow-equal";

const propsStorage = getStorage(storageKeys.PROPS);

function nodeEquals(elementNode: Node, fragmentNode: Node): boolean {
    const elClone = elementNode.cloneNode(false);
    const frClone = fragmentNode.cloneNode(false);
    if (propsStorage.get(fragmentNode)) {
        return shallowEqual(
            propsStorage.get(elementNode),
            propsStorage.get(fragmentNode)
        ) && elClone.isEqualNode(frClone)
    }
    return elClone.isEqualNode(frClone)
}

function contentDiffer(elementNode: Node, fragmentNode: Node): boolean {
    return elementNode.isEqualNode(fragmentNode) === false
}

function elementsDeleted(elementNodes: Node[], fragmentNodes: Node[]): Array<Node> {
    if (elementNodes.length > fragmentNodes.length) {
        for (let i = 0; i < elementNodes.length; i++) {
            if (elementNodes[i] && !fragmentNodes[i]) {
                return [elementNodes[i]].concat(
                    elementsDeleted(
                        Array.from(elementNodes).slice(i + 1),
                        Array.from(fragmentNodes).slice(i)
                    )
                )
            }
            if (!nodeEquals(elementNodes[i], fragmentNodes[i])) {
                const deleted = elementsDeleted(
                    Array.from(elementNodes).slice(i + 1),
                    Array.from(fragmentNodes).slice(i)
                );
                if (deleted.length === 0) {
                    return [elementNodes[i]]
                }
            }
        }
    }
    return []
}

function childrenChangedCount(elementNodes: Node[], fragmentNodes: Node[]): number {
    if (elementNodes.length > fragmentNodes.length) {
        return fragmentNodes.length
    }
    let changed = 0;
    for (let i = 0; i < elementNodes.length; i++) {
        const elClone = elementNodes[i].cloneNode(false);
        const frClone = fragmentNodes[i].cloneNode(false);
        if (!nodeEquals(elementNodes[i], fragmentNodes[i])) {
            if (!isEmptyNode(elClone) && !isEmptyNode(frClone)) {
                changed++
            }
        }
    }
    return changed
}

function appendChildren(elementNode: Node, elementChildren: Node[], fragmentChildren: Node[]): void {
    const fragment = document.createDocumentFragment();
    for (let i = elementChildren.length; i < fragmentChildren.length; i++) {
        fragment.appendChild(
            fragmentChildren[i]
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
    if (propsStorage.get(fragmentNode)) {
        const elProps = propsStorage.get(elementNode);
        const frProps = propsStorage.get(fragmentNode);
        propsStorage.set(
            elementNode,
            frProps
        );
        if (!shallowEqual(elProps, frProps)) {
            if (isCustomComponent(elementNode)) {
                render.call((elementNode: any))
            }
        }
    }
}

function updateElement(elementNode: Node, fragmentNode: Node): void {
    if (isCustomComponent(elementNode)) {
        return updateAttributes(
            elementNode,
            fragmentNode
        )
    }
    if (!nodeEquals(elementNode, fragmentNode)) {
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
    if (node.nodeType !== Node.TEXT_NODE) {
        return false
    }
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

function handleChildrenCountChanged(elementNode: Node, fragmentNode: Node, elementNodes: Node[], fragmentNodes: Node[]): void {
    const deleted = elementsDeleted(
        elementNodes,
        fragmentNodes,
    );
    if (fragmentNodes.length === 0) {
        return (elementNode.parentNode: any).replaceChild(
            fragmentNode,
            elementNode,
        );
    }
    if (deleted.length === 1) {
        (deleted[0].parentNode: any).removeChild(deleted[0]);
        return updateChildren(
            elementNode,
            fragmentNode
        )
    }
    if (childrenChangedCount(elementNodes, fragmentNodes) > 0) {
        return (elementNode.parentNode: any).replaceChild(
            fragmentNode,
            elementNode,
        );
    }
    return appendChildren(
        elementNode,
        elementNodes,
        fragmentNodes,
    )
}

function updateChildren(elementNode: Node, fragmentNode: Node): void {
    const elementNodes = Array.from(elementNode.childNodes).filter(nodeFilter);
    const fragmentNodes = Array.from(fragmentNode.childNodes).filter(nodeFilter);
    if (elementNodes.length !== fragmentNodes.length) {
        return handleChildrenCountChanged(
            elementNode,
            fragmentNode,
            elementNodes,
            fragmentNodes
        )
    }
    if (elementNodes.length === 0 && fragmentNodes.length === 0) {
        if (contentDiffer(elementNode, fragmentNode)) {
            return (elementNode.parentNode: any).replaceChild(
                fragmentNode,
                elementNode,
            );
        }
    }
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