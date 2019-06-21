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

export class XChatState {
    messages: XChatMessage[] = [];
}