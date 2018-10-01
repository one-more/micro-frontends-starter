// @flow

import type {Component} from "./interfaces"

const queue = [];

function childNodesEqual(elementNodes: NodeList<Node>, fragmentNodes: NodeList<Node>): void {

}

function attributesEqual(attr1, attr2) {
    if (attr1 && attr2)
        return attr1.nodeValue === attr2.nodeValue;
    return false
}

function attributesDiff(nodeAttributes, fragmentAttributes) {
    const diff = [];
    const iterable = nodeAttributes.length > fragmentAttributes.length ? nodeAttributes : fragmentAttributes;
    const comparable = iterable === fragmentAttributes ? nodeAttributes : fragmentAttributes;
    for (let i = 0; i < iterable.length; i++) {
        if (!attributesEqual(iterable[i], comparable[i])) {
            diff.push(
                {
                    element: nodeAttributes[i],
                    fragment: fragmentAttributes[i]
                }
            )
        }
    }
    return diff
}

function updateElement(elementNodes: NodeList<any>, fragmentNodes: NodeList<any>): void {
    for (let i = 0;  i < elementNodes.length; i++) {
        if (!elementNodes[i].isEqualNode(fragmentNodes[i])) {
            const diffAttributes = attributesDiff(elementNodes[i].attributes, fragmentNodes[i].attributes);
            if (!diffAttributes.length) {
                console.log("attributes are equal");
            } else {
                console.log(diffAttributes);
            }
            updateElement(
                elementNodes[i].childNodes,
                fragmentNodes[i].childNodes
            );
            for (const stack of diffAttributes) {
                const {element, fragment} = stack;
                if ((element && fragment) || (!element && fragment)) {
                    elementNodes[i].setAttribute(
                        fragment.nodeName,
                        fragment.nodeValue
                    )
                } else if (element && !fragment) {
                    elementNodes[i].removeAttribute(element.nodeName)
                }
            }
        }
    }
}

function render() {
    if (this.isShadow && !this.shadowRoot) {
        this.attachShadow({mode: 'open'});
    }
    const styles = `<style>${this.styles}</style>`;
    const render = styles + this.render();
    const root = this.isShadow ? (this.shadowRoot: any) : this;
    if (!root.innerHTML) {
        root.innerHTML = render
    } else {
        const fragment = document.createElement("template");
        fragment.innerHTML = render;
        updateElement(root.childNodes, fragment.content.childNodes)
    }
}

let scheduleId;

export function scheduleRender(component: Component) {
    queue.push(component);
    if (scheduleId) {
        clearTimeout(scheduleId);
    }
    scheduleId = setTimeout(executeRender)
}

export function executeRender() {
    let component;
    while (component = queue.pop()) {
        render.call(component)
    }
    scheduleId = null
}