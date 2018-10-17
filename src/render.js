// @flow

export function render() {
    this.beforeRender();

    if (this.isShadow && !this.shadowRoot) {
        this.attachShadow({mode: 'open'});
    }

    if (!this.root) {
        if (this.isShadow) {
            this.shadowRoot.innerHTML = `<style>${this.styles}</style>`;
            this.root = document.createElement("div");
            this.shadowRoot.appendChild(this.root);
            this.root.style = 'display: contents'
        } else {
            this.innerHTML = `<style>${this.styles}</style>`;
            this.root = this
        }
    }

    const renderRes = this.render();
    if (renderRes) {
        this.insertContent(this.root, renderRes)
    }

    this.mounted = true;

    this.afterRender();
}