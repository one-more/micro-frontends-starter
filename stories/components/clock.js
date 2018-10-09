import {Component, registerComponent, registerReducer} from "../../dist/main";

const dateStr = () => `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

const reducer = {
    state: {
        time: dateStr()
    },
    actions: {
        update() {
            return {
                time: dateStr()
            }
        }
    }
};

const KEY = "clock";

export default class Clock extends Component {
    static get name() {
        return `x-${KEY}`;
    }

    get keys() {
        return [KEY]
    }

    connected() {
        this.state.clock.update();
        this.interval = setInterval(
            this.state.clock.update,
            1000,
        );
    }

    disconnected() {
        clearInterval(this.interval)
    }

    render() {
        return `
            <div>${this.state.clock.time}</div>
        `
    }
}

registerReducer(KEY, reducer);

registerComponent(Clock.name, Clock);