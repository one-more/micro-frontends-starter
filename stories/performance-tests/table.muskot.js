import { Component, registerComponent, html } from "../../src";

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
        return `
            <table>
                <tbody>
                    ${data.map(row => `
                        <tr style="font-size: 2px; width: 1px; height: 1px">
                            ${row.map(
                                col => `<td style="width: 1px; height: 1px">${col}</td>`
                            ).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>   
        `
    }
}

registerComponent(MuskotTable.name, MuskotTable);