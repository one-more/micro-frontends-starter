import {X_CHAT_KEY} from "./constants";
import {WithXChatState, XChatState} from "./models";

export function xChatStateSelector(state: WithXChatState): XChatState {
    return state[X_CHAT_KEY]
}