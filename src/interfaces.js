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

export interface WebComponents {
    registerComponent(name: string, component: Function): void,
    isCustomComponent(node: Node): boolean
}