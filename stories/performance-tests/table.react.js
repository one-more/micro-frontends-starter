import {Component, define, connect} from "../../dist/main";
import {reactRenderer} from "../renderers";
import React from "react"

let start;
let end;

@define('react-table')
@reactRenderer
export default class MuskotTable extends Component {
    get isShadow() {
        return false;
    }

    beforeRender() {
        console.log('start render react');
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
        return (
            <table>
                <thead>
                    <tr>
                        {data[0].map(i => <th key={i}>#</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => <tr key={i}>{row.map((col, j) => <td key={j}>{col}</td>)}</tr>)}
                </tbody>
            </table>
        )
    }
}