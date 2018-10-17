import {Component, define} from "../../dist/main";
import {hyperRenderer} from "../renderers";

@define('x-greeter')
@hyperRenderer
export default class Greeter extends Component {
    get isShadow() {
        return false;
    }
    
    props = {
        greet: "hello",
        name: "world!"
    };

    render() {
        this.html`
            <div>${this.props.greet} ${this.props.name}</div>
        `
    }
}