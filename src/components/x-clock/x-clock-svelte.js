import {Component} from "@micro-frontends/core";
import Clock from "./clock.svelte";
import {renderSvelte} from "@micro-frontends/framework";

export class XClockSvelte extends Component {
    static getName() {
        return 'x-clock-svelte'
    }

    render(root) {
        renderSvelte(root, Clock)
    }
}