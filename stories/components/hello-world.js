import {Component, registerComponent} from "../../dist/main";

export default class HelloWorld extends Component {
    static get name() {
        return 'hello-world';
    }

    render() {
        return `
            <div>Hello world!</div>
        `
    }
}

registerComponent(HelloWorld.name, HelloWorld);