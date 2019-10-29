import {Component} from "@micro-frontends/core";
import * as React from "react"
import styled from "styled-components"
import {XChatMessage, XChatMessages, XChatState} from "../data/models";
import {xChatStateSelector} from "../data/selectors";
import {store} from "~/store";
import {RefObject} from "react";
import {renderReact} from "@micro-frontends/framework";

export class XChatDisplay extends Component<XChatState> {
    static getName(): string {
        return 'x-chat-display'
    }

    store = store;
    selector = xChatStateSelector;

    render(root: HTMLDivElement) {
        renderReact(
            <Display messages={this.state.messages} />,
            root,
        )
    }
}

type DisplayProps = {
    messages: XChatMessages
}
class Display extends React.Component<DisplayProps> {
    wrapper: RefObject<HTMLDivElement> = React.createRef();

    render(): React.ReactElement<undefined> {
        return (
            <Wrapper ref={this.wrapper} >
                {this.props.messages.map(this.renderMessage)}
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