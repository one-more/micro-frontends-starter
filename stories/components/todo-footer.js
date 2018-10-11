import {Component, registerComponent, html} from "../../dist/main";

export default class TodoFooter extends Component {
    static get name() {
        return 'todo-footer';
    }

    static get observableProps() {
        return ['filter', 'completed', 'active']
    }

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
        return html`
            <footer class="footer" ${this.props.items.length === 0 ? 'hidden' : ''} >
                <span class="todo-count">
                    <strong>${this.props.active.length}</strong>
                    <span> items left</span>
                </span>
                <ul class="filters">
                    <li>
                    <a 
                        class="${this.getLinkClass(this.props.filters.ALL)}" 
                        onClick="${this.props.filterAll}"
                    >All</a>
                    </li>
                    <span></span>
                    <li>
                        <a 
                            class="${this.getLinkClass(this.props.filters.ACTIVE)}"
                            onClick="${this.props.filterActive}"
                        >Active</a>
                    </li>
                    <span></span>
                    <li>
                        <a 
                            class="${this.getLinkClass(this.props.filters.COMPLETED)}"
                            onClick="${this.props.filterCompleted}"
                        >Completed</a>
                    </li>
                </ul>
                <button 
                    class="clear-completed"
                    ${this.props.completed.length === 0 ? 'hidden' : '' }
                    onClick="${this.props.clearCompleted}"
                >
                    Clear Completed
                </button>
            </footer>
        `
    }
}

registerComponent(TodoFooter.name, TodoFooter);