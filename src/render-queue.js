// @flow

import type {Component} from "./interfaces"

const queue = [];

function attributesEqual(attr1, attr2) {
    if (attr1 && attr2)
        return attr1.nodeValue === attr2.nodeValue;
    return false
}

function attributesDiff(nodeAttributes, fragmentAttributes) {
    if (!nodeAttributes) {
        return Array.from(fragmentAttributes || []).map(fragment => ({
            element: null,
            fragment
        }))
    }
    if (!fragmentAttributes) {
        return []
    }
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

function updateNode(elementNode: HTMLElement, fragmentNode: HTMLElement): void {
    const diffAttributes = attributesDiff(elementNode.attributes, fragmentNode.attributes);
    const elHasC = nodeHasChildren(elementNode);
    const frHasC = nodeHasChildren(fragmentNode);
    if (elHasC && frHasC) {
        updateElement(
            elementNode.childNodes,
            fragmentNode.childNodes
        );
    } else {
        // $FlowFixMe
        elementNode.parentNode.replaceChild(
            fragmentNode,
            elementNode,
        )
    }
    for (const stack of diffAttributes) {
        const {element, fragment} = stack;
        if ((element && fragment) || (!element && fragment)) {
            elementNode.setAttribute(
                fragment.nodeName,
                fragment.nodeValue
            )
        } else if (element && !fragment) {
            elementNode.removeAttribute(element.nodeName)
        }
    }
}

function nodeHasChildren(node: HTMLElement): boolean {
    if (node.childNodes.length)
        return filterEmptyNodes(node.childNodes).length > 0;
    return false
}

function isAllWs(nod: HTMLElement) {
    // Use ECMA-262 Edition 3 String and RegExp features
    return !(/[^\t\n\r ]/.test(nod.textContent));
}

function isIgnorable(nod: HTMLElement) {
    return ( nod.nodeType === 8) || // A comment node
        ( (nod.nodeType === 3) && isAllWs(nod) ); // a text node, all ws
}

function filterEmptyNodes(nodeList: NodeList<any>): Array<any> {
    const res = [];
    for (let i = 0; i < nodeList.length; i++) {
        if (!isIgnorable(nodeList[i])) {
            res.push(nodeList[i])
        }
    }
    return res
}

function updateElement(elementNodes: NodeList<any>, fragmentNodes: NodeList<any>): void {
    // $FlowFixMe
    elementNodes = filterEmptyNodes(elementNodes);
    // $FlowFixMe
    fragmentNodes = filterEmptyNodes(fragmentNodes);
    if (elementNodes.length > fragmentNodes.length) {
        for (let i = fragmentNodes.length; i < elementNodes.length; i++) {
            elementNodes[i].parentNode.removeChild(elementNodes[i]);
            elementNodes.splice(i, 1)
        }
    }
    for (let i = 0;  i < elementNodes.length; i++) {
        if (!elementNodes[i].isEqualNode(fragmentNodes[i])) {
            if (elementNodes[i].tagName === fragmentNodes[i].tagName) {
                updateNode(
                    elementNodes[i],
                    fragmentNodes[i]
                )
            } else {
                elementNodes[i].parentNode.replaceChild(
                    fragmentNodes[i],
                    elementNodes[i],
                )
            }
        }
    }
    if (fragmentNodes.length > elementNodes.length) {
         const fragment = document.createDocumentFragment();
         for (let i = elementNodes.length; i < fragmentNodes.length; i++) {
             fragment.appendChild(
                 fragmentNodes[i]
             )
         }
         elementNodes[0].parentNode.appendChild(fragment)
    }
}

function createFragmentFromStr(tpl: string): HTMLTemplateElement {
    const template = document.createElement("template");
    template.innerHTML = tpl;
    return template
}

function render() {
    if (this.isShadow && !this.shadowRoot) {
        this.attachShadow({mode: 'open'});
    }
    const styles = `<style>${this.styles}</style>`;
    const renderRes = this.render();
    const root = this.isShadow ? (this.shadowRoot: any) : this;
    const fragment = typeof renderRes === "string" ? createFragmentFromStr(renderRes) : renderRes;
    if (!this.mounted) {
        this.mounted = true;
        root.innerHTML = styles;
        root.appendChild(fragment.content)
    } else {
        updateElement(
            root.childNodes,
            fragment.childNodes
        )
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