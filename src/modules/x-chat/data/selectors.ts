import {X_CHAT_KEY} from "~/modules/x-chat/data/constants";
import {XChatState} from "~/modules/x-chat/data/models";

export function xChatStateSelector(state: { [X_CHAT_KEY]: XChatState }): XChatState {
    return state[X_CHAT_KEY]
}