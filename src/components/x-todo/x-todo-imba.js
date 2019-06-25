import {start} from './todo.imba';
import {Component} from "@micro-frontends/core";
import "./imba-todo.css";

export class XTODOImba extends Component {
    static getName() {
        return 'x-todo-imba'
    }

    render(root) {
        start(root)
    }
}