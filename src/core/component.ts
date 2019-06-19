export class Component extends HTMLElement {
    static getName(): string {
        throw new Error("Custom component should overload static getName method")
    }

    isShadow: boolean = true;
    root: HTMLDivElement;

    constructor() {
        super();

        if (this.isShadow) {
            this.attachShadow({mode: 'open'})
        } else {
            this.root = document.createElement('div');
            this.root.style.display = 'contents';
        }

        this.beforeRender();
        this.render(this.isShadow ? this.shadowRoot : this.root);
        this.afterRender();
    }

    beforeRender() {}

    afterRender() {}

    render(root: ShadowRoot | HTMLDivElement) {}
}