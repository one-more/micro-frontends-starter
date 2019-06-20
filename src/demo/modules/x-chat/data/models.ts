export class XChatMessage {
    id: number;
    from: string;
    text: string;

    constructor(
        id: number,
        from: string,
        text: string,
    ) {
        this.id = id;
        this.from = from;
        this.text = text
    }
}

export class XChatState {
    messages: XChatMessage[] = [];
}