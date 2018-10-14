import {Component} from "hyperhtml"

class TableRow extends Component {
    constructor(row) {
        super();

        this.row = row
    }

    render() {
        return this.html`
            <tr>  
                ${this.row.map(col => `<td>${col}</td>`)}
            </tr>
        `
    }
}

export default class Table extends Component {
    constructor(data) {
        super();
        this.items = data
    }

    render() {
        return this.html`
            <table>
                <thead>
                    <tr>
                        ${this.items[0].map(() => `<th>#</th>`)}
                        </tr>
                </thead>
                <tbody>
                    ${this.items.map(item => TableRow.for(item))}
                </tbody>
            </table>   
        `
    }
}