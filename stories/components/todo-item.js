import {Component, define} from "../../dist/main";
import {litRenderer} from "../renderers";

@define('todo-item')
@litRenderer
export default class TodoItem extends Component {
    get isShadow(): boolean {
        return false
    }

    get done(): boolean {
        return this.props.done === "true"
    }

    render() {
        return this.html`
            <li class="${this.done  ? 'completed' : ''}">
                <div class="view">
                    <input 
                        type="checkbox"
                        class="toggle"
                        @change="${() => this.props.toggle(this.props.id)}"
                        ${this.done ? 'checked' : ''}
                    >
                    <label>${this.props.text}</label>
                    <button 
                        class="destroy" 
                        @click="${() => this.props.remove(this.props.id)}" 
                    >
                    </button>
                </div>
            </li>
        `
    }
}