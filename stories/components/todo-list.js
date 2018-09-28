import {
    Component, registerComponent,
    registerReducer, html
} from "../../dist/main";

const KEY = 'todo-list';

const reducer = {
    state: {
        items: [
            {
                id: 0,
                done: false,
                text: "first!"
            }
        ]
    },
    actions: {
        add(state, text) {
            const todo = {
                id: state.items.length,
                done: false,
                text
            };
            return {
                items: state.items.concat(todo)
            }
        },
        toggle(state, id) {
            return {
                items: state.items.map(todo => {
                    if (todo.id === id) {
                        return {
                            ...todo,
                            done: !todo.done
                        }
                    }
                    return todo
                })
            }
        },
        remove(state, id) {
            return {
                items: state.items.filter(todo => todo.id !== id)
            }
        }
    }
};

export default class TodoList extends Component {
    static get name() {
        return KEY;
    }

    get keys(): string[] {
        return [KEY]
    }

    render() {
        return html`
            <ul>
                <li map="${this.state[KEY].items}">
                    ${el => html`
                        <input 
                            type="checkbox" 
                            ${el.done ? 'checked' : ''}
                            onClick="${this.state[KEY].toggle.bind(null, el.id)}"
                        >
                        ${el.text}
                    `}
                </li>
            </ul>
        `
    }
}

registerReducer(KEY, reducer);
registerComponent(TodoList.name, TodoList);