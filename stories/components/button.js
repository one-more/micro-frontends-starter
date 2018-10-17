import {Component, define} from "../../dist/main";

const sizes = {
    s: "s",
    m: "m",
    l: "l"
};

const types = {
    default: "default",
    info: "info",
    danger: "danger",
    success: "success"
};

const heightBySize = {
    [sizes.s]: "auto",
    [sizes.m]: "30px",
    [sizes.l]: "45px",
};

const paddingBySize = {
    [sizes.s]: "2px 7px",
    [sizes.m]: "10px",
    [sizes.l]: "15px",
};

const lineHeightBySize = {
    [sizes.s]: "initial",
    [sizes.m]: "0",
    [sizes.l]: "0",
};

const bgColorByType = {
    [types.default]: "buttonface",
    [types.info]: "blue",
    [types.danger]: "red",
    [types.success]: "green",
};

const colorByType = {
    [types.default]: "initial",
    [types.info]: "white",
    [types.danger]: "white",
    [types.success]: "white",
};

const borderWidthByType = {
    [types.default]: "1px",
    [types.info]: "0",
    [types.danger]: "0",
    [types.success]: "0",
};

@define('x-button')
export default class Button extends Component {
    props = {
        size: sizes.s,
        type: types.default
    };

    get styles() {
        return this.css`
            button {
                height: ${() => heightBySize[this.props.size]};
                padding: ${() => paddingBySize[this.props.size]};
                line-height: ${() => lineHeightBySize[this.props.size]};
                background-color: ${() => bgColorByType[this.props.type]};
                color: ${() => colorByType[this.props.type]};
                border-radius: 4px;
                border-width: ${() => borderWidthByType[this.props.type]};
            }
        `
    }

    render() {
        return `
            <button>
                <slot></slot>
            </button>  
        `
    }
}