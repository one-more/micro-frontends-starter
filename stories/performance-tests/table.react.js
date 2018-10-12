import React, {Component} from "react"

let start;
let end;

export default class ReactTable extends Component {
    componentWillMount() {
        console.log('start render react');
        start = performance.now();
    }

    componentDidMount() {
        end = performance.now();
        console.log(
            `rendered by ${end - start}ms`
        );
    }

    render() {
        return (
            <table>
                <tbody>
                    {this.props.rows.map((row, i) => <tr key={i}>
                        {row.map((col, j) => <td key={j}>{col}</td>)}
                    </tr>)}
                </tbody>
            </table>
        )
    }
}