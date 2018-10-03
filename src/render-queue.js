// @flow

function nodeConnected(node: Node): boolean {
    return document.contains(node)
}

function updateElement(elementNode: Node, fragmentNode: Node): void {
    const filter = {
        acceptNode: (node: Node) => {
            if (node instanceof HTMLStyleElement) {
                return NodeFilter.FILTER_REJECT
            }
            return NodeFilter.FILTER_ACCEPT;
        }
    };
    const elWalker = document.createTreeWalker(
        elementNode,
        NodeFilter.SHOW_ELEMENT,
        filter
    );
    const fragmentWalker = document.createTreeWalker(
        fragmentNode,
        NodeFilter.SHOW_ELEMENT,
        filter
    );
    while (elWalker.nextNode()) {
        fragmentWalker.nextNode();

        const elCurrent = elWalker.currentNode;
        const frCurrent = fragmentWalker.currentNode;
        const elClone = elCurrent.cloneNode(false);
        const frClone = frCurrent.cloneNode(false);
        if (!elClone.isEqualNode(frClone)) {
            console.log(
                "not equal",
            );
        }
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
        console.log(root)
    } else {
        const style = document.createElement("style");
        style.innerHTML = this.styles;
        console.log(fragment.content);
        fragment.content.insertBefore(
            style,
            fragment.content.firstChild
        );
        // updateElement(
        //     root,
        //     fragment.content
        // )
    }
}