import {Component, registerComponent} from "../../dist/main";

export default class Greeter extends Component {
    static get name() {
        return 'x-greeter';
    }

    get isShadow() {
        return false;
    }
    
    props = {
        greet: "hello",
        name: "world!"
    };

    render() {
        return `
            <div>${this.props.greet} ${this.props.name}</div>
        `
    }
}

registerComponent(Greeter.name, Greeter);