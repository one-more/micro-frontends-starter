import * as React from "react";
import {Component} from "~/core";
import {renderReact} from "~/framework";

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

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div>{this.state.time.toLocaleString()}</div>
        )
    }
}