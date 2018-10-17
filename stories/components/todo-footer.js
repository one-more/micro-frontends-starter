import {Component, define} from "../../dist/main";
import {reactRenderer} from "../renderers";
import React from "react"

@define('todo-footer')
@reactRenderer
export default class TodoFooter extends Component {
    get isShadow() {
        return false;
    }

    getLinkClass(filterName: string): string {
        if (this.props.filter === filterName) {
            return "selected"
        }
        return ""
    }

    render() {
        return (
            <footer className="footer" hidden={this.props.items.length === 0} >
                <span className="todo-count">
                    <strong>{this.props.active.length}</strong>
                    <span> items left</span>
                </span>
                <ul className="filters">
                    <li>
                        <a
                            className={this.getLinkClass(this.props.filters.ALL)}
                            onClick={this.props.filterAll}
                        >All</a>
                    </li>
                    <span></span>
                    <li>
                        <a
                            className={this.getLinkClass(this.props.filters.ACTIVE)}
                            onClick={this.props.filterActive}
                        >Active</a>
                    </li>
                    <span></span>
                    <li>
                        <a
                            className={this.getLinkClass(this.props.filters.COMPLETED)}
                            onClick={this.props.filterCompleted}
                        >Completed</a>
                    </li>
                </ul>
                <button
                    className="clear-completed"
                    hidden={this.props.completed.length === 0}
                    onClick={this.props.clearCompleted}
                >
                    Clear Completed
                </button>
            </footer>
        )
    }
}