import {Component} from "@micro-frontends/core";
import * as React from "react"
import styled from "styled-components"
import {XChatMessage, XChatState} from "~/modules/x-chat/data/models";
import {xChatStateSelector} from "~/modules/x-chat/data/selectors";
import {store, subscribeWithSelector} from "~/store";
import {Unsubscribe} from "redux";
import {RefObject} from "react";
import {renderReact} from "@micro-frontends/framework";

export class XChatDisplay extends Component {
    static getName(): string {
        return 'x-chat-display'
    }

    render(root: HTMLDivElement) {
        renderReact(
            <Display />,
            root,
        )
    }
}

function getState() {
    return xChatStateSelector(store.getState());
}

class Display extends React.Component {
    state: XChatState = getState();

    unsubscribe: Unsubscribe;

    wrapper: RefObject<HTMLDivElement> = React.createRef();

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Wrapper ref={this.wrapper} >
                {this.state.messages.map(this.renderMessage)}
            </Wrapper>
        )
    }

    renderMessage(message: XChatMessage) {
        return (
            <div
                style={{
                    textAlign: message.side
                }}
                key={message.id}
            >
                <Message>
                    <Title>{message.from}:</Title>
                    <span>{message.text}</span>
                </Message>
            </div>
        )
    }

    scrollToBottom() {
        const wrapper = this.wrapper.current;
        wrapper.scrollTop = wrapper.scrollHeight
    }

    componentDidUpdate(): void {
        this.scrollToBottom();
    }

    componentDidMount(): void {
        this.scrollToBottom();
        this.unsubscribe = subscribeWithSelector(
            xChatStateSelector,
            () => {
                this.setState(
                    getState(),
                )
            }
        )
    }

    componentWillUnmount(): void {
        this.unsubscribe()
    }
}

const Wrapper = styled.div`
    width: auto;
    max-width: 400px;
    border: 1px solid #eee;
    height: 450px;
    padding: 10px;
    box-sizing: border-box;
    overflow: auto;
`;

const Message = styled.div`
    border-radius: 30px;
    background-color: aliceblue;
    padding: 10px 20px;
    display: inline-block;
    line-height: 1em;
    text-align: left;
    margin: 5px 0;
`;

const Title = styled.p`
    margin: 0;
`;