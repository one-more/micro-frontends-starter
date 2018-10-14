import {Component, registerComponent, html} from "../../dist/main";

const key = 'table';

let start;
let end;

export default class MuskotTable extends Component {
    static get name() {
        return 'x-table';
    }

    get isShadow() {
        return false;
    }

    get keys() {
        return [key]
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
        const {data} = this.state[key];
        return html`
            <table>
                <thead>
                    <tr>
                        ${data[0].map(() => `<th>#</th>`)}
                    </tr>
                </thead>
                <tbody>
                    <template map="${data}">
                        <tr>
                            ${row => row.map(col => `<td>${col}</td>`)}
                        </tr>
                    </template>
                </tbody>
            </table>   
        `
    }
}

registerComponent(MuskotTable.name, MuskotTable);