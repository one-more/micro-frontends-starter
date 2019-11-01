import {createStore, combineReducers} from "redux";
import {xChatReducers} from "~/modules/x-chat";

export const store = createStore(
    combineReducers({
        ...xChatReducers,
    })
);