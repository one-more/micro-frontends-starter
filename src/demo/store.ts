import {createStore, combineReducers, Unsubscribe} from "redux";
import {xChatReducers} from "~/demo/modules/x-chat";

export const store = createStore(
    combineReducers({
        ...xChatReducers,
    })
);

export function subscribeWithSelector(selector: Function, cb: Function): Unsubscribe {
    let prevValue = selector(
        store.getState()
    );
    return store.subscribe(() => {
        const newValue = selector(
            store.getState()
        );
        if (newValue != prevValue) {
            prevValue = newValue;
            cb(
                newValue,
            )
        }
    })
}