// @flow

export interface Component {
    get isShadow(): boolean,
    get styles(): string,
    mounted: boolean,
    isRendering: boolean,
    render(): string,
}