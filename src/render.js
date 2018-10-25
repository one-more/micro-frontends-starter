// @flow

export function render() {
    this.beforeRender();

    if (this.isShadow && !this.shadowRoot) {
        this.attachShadow({mode: 'open'});
    }

    if (!this.root) {
        this.root = document.createElement("div");
        this.root.style.display = 'contents';
        if (this.isShadow) {
            this.shadowRoot.innerHTML = `<style>${this.styles}</style>`;
            this.shadowRoot.appendChild(this.root);
        } else {
            this.styles && (this.innerHTML = `<style>${this.styles}</style>`);
            this.appendChild(this.root)
        }
    }

    const renderRes = this.render();
    if (renderRes) {
        this.insertContent(this.root, renderRes)
    }

    this.mounted = true;

    this.afterRender();
}