import {Component, define, connect} from "../../dist/main";

const key = 'table';

let start;
let end;

@define('x-table')
@connect(key)
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
        const {data} = this.state[key];
        return this.html`
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