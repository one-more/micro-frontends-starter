import {Component, define, connect, registerReducer} from "../../dist/main";
import {litRenderer} from "../renderers";

const KEY = "counter";

const reducer = {
    state: {
        current: 0
    },
    actions: {
        set(state, current: number) {
            if (current < 0) {
                current = 0
            }
            return {current}
        }
    }
};

@define(`x-${KEY}`)
@connect(KEY)
@litRenderer
export default class Counter extends Component {
    props = {
        start: 0
    };

    connected() {
        this.state.set(Number(this.props.start))
    }

    inc = () => {
        this.state.set(this.state.current + 1)
    };

    dec = () => {
        this.state.set(this.state.current - 1)
    };

    render() {
        return this.html`
            <div style="display: flex" >
                <button @click="${this.inc}" > + </button>&nbsp;
                <div>${this.state.current}</div>&nbsp;
                <button @click="${this.dec}" > - </button>
            </div>
        `
    }
}

registerReducer(KEY, reducer);