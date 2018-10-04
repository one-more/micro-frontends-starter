// @flow

function nodeConnected(node: Node): boolean {
    return document.contains(node)
}

function updateElement(elementNode: Node, fragmentNode: Node): void {
    const elClone = elementNode.cloneNode(false);
    const frClone = fragmentNode.cloneNode(false);
    if (!elClone.isEqualNode(frClone)) {
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
    if (this.isShadow && !this.shadowRoot) {
        this.attachShadow({mode: 'open'});
    }
    const renderRes = this.render();
    const root = this.isShadow ? (this.shadowRoot: any) : this;
    const fragment = typeof renderRes === "string" ? createFragmentFromStr(renderRes) : renderRes;
    if (!nodeConnected(this)) {
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
}