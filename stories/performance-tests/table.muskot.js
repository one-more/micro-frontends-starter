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
                <tbody>
                    <template map="${data}">
                            ${row => html`
                                <tr>
                                    <template map="${row}">
                                        ${col => `<td>${col}</td>`}
                                    </template>    
                                </tr>
                            `}
                    </template>
                </tbody>
            </table>   
        `
    }
}

registerComponent(MuskotTable.name, MuskotTable);