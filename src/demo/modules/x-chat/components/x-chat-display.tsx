import {Component} from "~/core";
import * as React from "react"
import {render} from "react-dom";
import styled from "styled-components"
import {XChatMessage, XChatState} from "~/demo/modules/x-chat/data/models";
import {xChatStateSelector} from "~/demo/modules/x-chat/data/selectors";
import {store, subscribeWithSelector} from "~/demo/store";
import {Unsubscribe} from "redux";

export class XChatDisplay extends Component {
    static getName(): string {
        return 'x-chat-display'
    }

    render(root: HTMLDivElement) {
        render(
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

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <Wrapper>
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

    componentDidMount(): void {
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
    width: 30vw;
    max-width: 400px;
    border: 1px solid #eee;
    height: 450px;
    padding: 10px;
    box-sizing: border-box;
`;

const Message = styled.div`
    border-radius: 30px;
    background-color: aliceblue;
    padding: 10px 20px;
    display: inline-block;
    line-height: 1em;
    text-align: left;
`;

const Title = styled.p`
    margin: 0;
`;