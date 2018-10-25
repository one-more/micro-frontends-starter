import {Component, define, connect} from "../../dist/main";
import {hyperRenderer} from "../renderers";

let start;
let end;

@define('hyper-table')
@hyperRenderer
export default class MuskotTable extends Component {
    get isShadow() {
        return false;
    }

    beforeRender() {
        console.log('start render hyper');
        start = performance.now();
    }

    afterRender() {
        end = performance.now();
        console.log(
            `rendered by ${end - start}ms`
        );
    }

    render() {
        const {data} = this.props;
        return this.html`
            <table>
                <thead>
                    <tr>
                        ${data[0].map(() => `<th>#</th>`)}
                    </tr>
                </thead>
                <tbody>
                    ${data.map(row => `<tr>${row.map(col => `<td>${col}</td>`).join("")}</tr>`)}
                </tbody>
            </table>   
        `
    }
}