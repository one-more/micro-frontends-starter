export class Component extends HTMLElement {
    static getName(): string {
        throw new Error("Custom component should overload static getName method")
    }
}