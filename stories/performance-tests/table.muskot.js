import {Component, define, connect} from "../../dist/main";

let start;
let end;

@define('muskot-table')
export default class MuskotTable extends Component {
    get isShadow() {
        return false;
    }

    beforeRender() {
        console.log('start render muskot');
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
                    ${data.map(row => this.html`<tr>${row.map(col => `<td>${col}</td>`)}</tr>`)}
                </tbody>
            </table>   
        `
    }
}