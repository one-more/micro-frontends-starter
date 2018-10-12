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
                    {this.props.rows.map((row, i) => <tr key={i} style={{fontSize: '2px', width: '1px', height: '1px'}}>
                        {row.map((col, j) => <td key={j} style={{width: '1px', height: '1px'}}>{col}</td>)}
                    </tr>)}
                </tbody>
            </table>
        )
    }
}