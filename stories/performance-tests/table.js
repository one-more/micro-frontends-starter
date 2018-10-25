import React, {Component} from "react"
import styled from "styled-components"
import {registerReducer, getState, props} from "../../dist/main"
import "./table.react"
import "./table.muskot"
import "./table.hyperhtml"
import "./table.lit"
import "./table.vue"

const Frame = styled.div`
    display: flex;
`;

const FramePart = styled.div`
    flex: 1 0 50%;
    max-width: 50%;
    overflow: auto;
    
    :first-child {
        border-right: 5px solid grey;
    }
`;

const key = 'table';

const reducer = {
    state: {
        data: (new Array(100).fill().map(() => new Array(100).fill().map((el,i) => i)))
    }
};

registerReducer(key, reducer);

export default class Table extends Component {
    state = {
        renderReact: false,
        renderMuskot: false,
        renderHyper: false,
        renderLit: false,
        renderVue: false,
    };

    renderReact = () => {
        this.setState({
            renderReact: true
        })
    };

    renderMuskot = () => {
        this.setState({
            renderMuskot: true
        })
    };

    renderHyper = () => {
        this.setState({
            renderHyper: true
        })
    };

    renderLit = () => {
        this.setState({
            renderLit: true
        })
    };

    renderVue = () => {
        this.setState({
            renderVue: true
        })
    };

    removeAll = () => {
        this.setState({
            renderMuskot: false,
            renderReact: false,
            renderHyper: false,
            renderLit: false,
            renderVue: false,
        })
    };

    render() {
        const {data} = getState(key);
        return (
            <React.Fragment>
                <Frame>
                    <button onClick={this.renderReact}>render react</button>
                    <button onClick={this.renderMuskot}>render muskot</button>
                    <button onClick={this.renderHyper}>render hyper html</button>
                    <button onClick={this.renderLit}>render lit</button>
                    <button onClick={this.renderVue}>render vue</button>
                    <button onClick={this.removeAll}>remove all</button>
                </Frame>
                <Frame>
                    <FramePart>
                        {this.state.renderReact && <react-table {...props({data})} />}
                    </FramePart>
                    <FramePart>
                        {this.state.renderMuskot && <muskot-table {...props({data})} />}
                    </FramePart>
                </Frame>
                <Frame>
                    <FramePart>
                        {this.state.renderHyper && <hyper-table {...props({data})} />}
                    </FramePart>
                    <FramePart>
                        {this.state.renderLit && <lit-table {...props({data})} />}
                    </FramePart>
                </Frame>
                <Frame>
                    <FramePart>
                        {this.state.renderVue && <vue-table {...props({data})} />}
                    </FramePart>
                </Frame>
            </React.Fragment>
        )
    }
}