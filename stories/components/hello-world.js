import {Component, define} from "../../dist/main";

@define('hello-world')
export default class HelloWorld extends Component {

    render() {
        return `
            <div>Hello world!</div>
        `
    }
}