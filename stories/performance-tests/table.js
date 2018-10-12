import React, {Component} from "react"
import styled from "styled-components"
import {registerReducer, getState} from "../../dist/main"
import ReactTable from "./table.react"
import "./table.muskot"

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

    removeAll = () => {
        this.setState({
            renderMuskot: false,
            renderReact: false,
        })
    };

    render() {
        const {data} = getState(key);
        return (
            <React.Fragment>
                <Frame>
                    <button onClick={this.renderReact}>render react</button>
                    <button onClick={this.renderMuskot}>render muskot</button>
                    <button onClick={this.removeAll}>remove all</button>
                </Frame>
                <Frame>
                    <FramePart>
                        {this.state.renderReact && <ReactTable rows={data} />}
                    </FramePart>
                    <FramePart>
                        {this.state.renderMuskot && <x-table></x-table>}
                    </FramePart>
                </Frame>
            </React.Fragment>
        )
    }
}