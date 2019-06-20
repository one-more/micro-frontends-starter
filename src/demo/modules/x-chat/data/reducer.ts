import {createActions, handleActions} from "redux-actions";
import {XChatMessage, XChatMessageSide, XChatState} from "~/demo/modules/x-chat/data/models";
import {X_CHAT_KEY} from "~/demo/modules/x-chat/data/constants";

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
    [xChatActions.sendMessage.toString()]: (state: XChatState, { payload }: SendMessagePayload): XChatState => ({
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
}, new XChatState);

export const xChatReducers = {
    [X_CHAT_KEY]: xChatReducer,
};