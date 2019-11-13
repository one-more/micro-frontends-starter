import * as React from "react";
import {Component} from "@micro-frontends/core";
import {renderReact} from "@micro-frontends/framework";

export class XClockReact extends Component {
    static getName(): string {
        return 'x-clock-react'
    }

    render(root: HTMLDivElement) {
        renderReact(
            <Clock />,
            root,
        )
    }
}

class Clock extends React.Component {
    state = {
        time: new Date(),
    };
    interval: number;

    componentDidMount(): void {
        this.interval = setInterval(() => {
            this.setState({
                time: new Date()
            })
        }, 1000)
    }

    componentWillMount(): void {
        clearInterval(this.interval)
    }

    render(): React.ReactChild {
        return (
            <div>{this.state.time.toLocaleString()}</div>
        )
    }
}