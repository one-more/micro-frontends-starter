// @flow

export interface Component extends HTMLElement {
    get isShadow(): boolean,
    get styles(): string,
    mounted: boolean,
    render(): string,
}