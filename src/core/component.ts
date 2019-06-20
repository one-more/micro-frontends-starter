export class Component extends HTMLElement {
    static getName(): string {
        throw new Error("Custom component should overload static getName method")
    }

    static get observedAttributes(): string[] {
        return [];
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
    }

    beforeRender() {}

    afterRender() {}

    connected() {}

    disconnected() {}

    propChanged(name: string, oldValue: string, newValue: string) {}

    render(root: ShadowRoot | HTMLDivElement) {}

    callRender(): void {
        this.render(this.isShadow ? this.shadowRoot : this.root);
    }

    connectedCallback() {
        this.beforeRender();
        this.callRender();
        this.afterRender();

        this.connected()
    }

    disconnectedCallback() {
        this.disconnected()
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (typeof oldValue != "undefined" && typeof newValue != "undefined") {
            if (oldValue !== newValue) {
                this.propChanged(name, oldValue, newValue)
            }
        }
    }

    update(): void {
        this.callRender()
    }
}