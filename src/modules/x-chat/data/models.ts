import {X_CHAT_KEY} from "~/modules/x-chat/data/constants";

export type XChatMessageSide = "left" | "right";

export class XChatMessage {
    id: number;
    from: string;
    text: string;
    side: XChatMessageSide;

    constructor(
        id: number,
        from: string,
        text: string,
        side: XChatMessageSide,
    ) {
        this.id = id;
        this.from = from;
        this.text = text;
        this.side = side;
    }
}

export type XChatMessages = XChatMessage[]

export class XChatState {
    messages: XChatMessages = [];
}

export type WithXChatState = { [X_CHAT_KEY]: XChatState }