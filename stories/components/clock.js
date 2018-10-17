import {Component, define, connect, registerReducer} from "../../dist/main";
import React from "react"
import {reactRenderer} from "../renderers";

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

@define(`x-${KEY}`)
@connect(KEY)
@reactRenderer
export default class Clock extends Component {
    connected() {
        this.state.update();
        this.interval = setInterval(
            this.state.update,
            1000,
        );
    }

    disconnected() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <div>
                {this.state.time}
            </div>
        )
    }
}

registerReducer(KEY, reducer);