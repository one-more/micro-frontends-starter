import {Component, define, connect} from "../../dist/main";
import {vueRenderer} from "../renderers";

let start;
let end;

@define('vue-table')
@vueRenderer
export default class MuskotTable extends Component {
    get isShadow() {
        return false;
    }

    beforeRender() {
        console.log('start render vue');
        start = performance.now();
    }

    afterRender() {
        end = performance.now();
        console.log(
            `rendered by ${end - start}ms`
        );
    }

    render() {
        return `
            <table>
                <thead>
                    <tr>
                        <th v-for="item in attributes.data[0]" >#</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="row in attributes.data" >
                        <td v-for="col in row" >
                            {{ col }}
                        </td>
                    </tr>
                </tbody>
            </table>   
        `
    }
}