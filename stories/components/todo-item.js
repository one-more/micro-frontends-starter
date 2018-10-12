import {Component, registerComponent, html} from "../../dist/main";

export default class TodoItem extends Component {
    static get name() {
        return 'todo-item';
    }

    get isShadow(): boolean {
        return false
    }

    get done(): boolean {
        return this.props.done === "true"
    }

    render() {
        return html`
            <li class="${this.done  ? 'completed' : ''}">
                <div class="view">
                    <input 
                        type="checkbox"
                        class="toggle"
                        onchange="${this.props.toggle}"
                        ${this.done ? 'checked' : ''}
                    >
                    <label>${this.props.text}</label>
                    <button 
                        class="destroy"
                        onclick="${this.props.destroy}"
                    >
                    </button>
                </div>
            </li>
        `
    }
}

registerComponent(TodoItem.name, TodoItem);