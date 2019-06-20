import {Component} from "../core";
import Clock from "./clock.svelte";

export class XClockSvelte extends Component {
    static getName() {
        return 'x-clock-svelte'
    }

    render(root) {
        new Clock({
            target: root,
        })
    }
}