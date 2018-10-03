// @flow

export interface Component {
    get isShadow(): boolean,
    get styles(): string,
    mounted: boolean,
    render(): string,
}