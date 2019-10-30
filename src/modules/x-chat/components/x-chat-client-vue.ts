import {Component} from "@micro-frontends/core";
import ChatClient from "./chat-client.vue"
import {renderVue} from "@micro-frontends/framework";
import {XChatState} from "~/modules/x-chat/data/models";
import { store } from "~/store";
import {xChatActions} from "~/modules/x-chat";

export class XChatClientVue extends Component<XChatState> {
    static getName(): string {
        return 'x-chat-client-vue'
    }

    store = store;
    actionCreators = xChatActions;

    render(root: HTMLDivElement) {
        renderVue(
            ChatClient,
            root,
            this.actions,
        )
    }
}