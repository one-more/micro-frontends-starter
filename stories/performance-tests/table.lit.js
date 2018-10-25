import {Component, define, connect} from "../../dist/main";
import {litRenderer} from "../renderers";

let start;
let end;

@define('lit-table')
@litRenderer
export default class MuskotTable extends Component {
    get isShadow() {
        return false;
    }

    beforeRender() {
        console.log('start render lit');
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
                        ${data[0].map(() => this.html`<th>#</th>`)}
                    </tr>
                </thead>
                <tbody>
                    ${data.map(row => this.html`<tr>${row.map(col => this.html`<td>${col}</td>`)}</tr>`)}
                </tbody>
            </table>   
        `
    }
}