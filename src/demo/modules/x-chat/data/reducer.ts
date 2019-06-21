import {createActions, handleActions} from "redux-actions";
import {XChatMessage, XChatMessageSide, XChatState} from "~/demo/modules/x-chat/data/models";
import {X_CHAT_KEY} from "~/demo/modules/x-chat/data/constants";

const PERSIST_KEY = "x-chat-persist";

export const xChatActions = createActions({
    SEND_MESSAGE: (from: string, text: string, side: XChatMessageSide) => ({ from, text, side })
});

interface SendMessagePayload {
    payload: {
        from: string,
        text: string,
        side: XChatMessageSide,
    }
}

export const xChatReducer = handleActions({
    [xChatActions.sendMessage.toString()]: (state: XChatState, { payload }: SendMessagePayload): XChatState => persist({
        ...state,
        messages: state.messages.concat(
            new XChatMessage(
                state.messages.length + 1,
                payload.from,
                payload.text,
                payload.side,
            )
        )
    }),
}, restore());

export const xChatReducers = {
    [X_CHAT_KEY]: xChatReducer,
};

function persist(state: XChatState) {
    try {
        localStorage.setItem(PERSIST_KEY, JSON.stringify(state))
    } catch(err) {}
    return state
}

function restore(): XChatState {
    const emptyState = new XChatState;
    try {
        return JSON.parse(localStorage.getItem(PERSIST_KEY)) as XChatState || emptyState
    } catch(err) {
        return emptyState
    }
}