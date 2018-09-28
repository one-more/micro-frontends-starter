import {
    Component, registerComponent, addTemplateHandler,
    registerReducer, html
} from "../../dist/main";

const MapHandler = {
    call: (raw: string, args: any[]) => {
        return raw.replace(
            /<(\w+)\s+(.*)map="(__ARG__(\d+))"(.*)>([\s\S]*)<\/\1>/gm,
            (match: string, tag: string, attributes, arg, arrIndex) => {
                const arr = args[arrIndex];
                const template = match.replace(/map=".*"/, '');
                return arr.map(el => {
                    return template.replace(/__ARG__(\d+)/g, (match: string, index: number) => {
                        const fn = args[index];
                        return fn(el)
                    })
                })
            }
        )
    }
};

addTemplateHandler('map', MapHandler);

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
        done(state, id) {
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
                    <input 
                        type="checkbox" 
                        ${(el) => el.done ? 'checked' : ''}
                        onclick=""
                    >
                    ${(el) => el.text}
                </li>
            </ul>
        `
    }
}

registerReducer(KEY, reducer);
registerComponent(TodoList.name, TodoList);