import {Component, registerComponent, registerReducer, html} from "../../dist/main";

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

export default class Counter extends Component {
    static get name() {
        return `x-${KEY}`;
    }

    get keys() {
        return [KEY]
    }

    props = {
        start: 0
    };

    connected() {
        this.state.counter.set(Number(this.props.start))
    }

    inc = () => {
        this.state.counter.set(this.state.counter.current + 1)
    };

    dec = () => {
        this.state.counter.set(this.state.counter.current - 1)
    };

    render() {
        return html`
            <div style="display: flex" >
                <button onClick="${this.inc}" > + </button>&nbsp;
                <div>${this.state.counter.current}</div>&nbsp;
                <button onClick="${this.dec}" > - </button>
            </div>
        `
    }
}

registerReducer(KEY, reducer);

registerComponent(Counter.name, Counter);