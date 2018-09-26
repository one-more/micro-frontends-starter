import {Component, registerComponent} from "../../dist/main";

export default class Clock extends Component {
    static get name() {
        return 'clock';
    }

    get keys() {
        return [Clock.name]
    }

    connected() {
        this.interval = setInterval();
    }

    disconnected() {
        clearInterval(this.interval)
    }

    render() {
        return `
            <div>${this.state.clock}</div>
        `
    }
}

registerComponent(Clock.name, Clock);