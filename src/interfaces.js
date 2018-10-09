// @flow

export interface Component {
    get isShadow(): boolean,
    get styles(): string,
    mounted: boolean,
    render(): string,
}

export interface TemplateHandler {
    call(node: Node, args: any[]): void
}