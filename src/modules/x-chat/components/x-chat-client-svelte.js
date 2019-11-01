import {Component} from "@micro-frontends/core";
import {renderSvelte} from "@micro-frontends/framework"
import Client from "./chat-client.svelte"
import {store} from "~/store";
import {xChatActions} from "~/modules/x-chat";

export class XChatClientSvelte extends Component {
    static getName() {
        return 'x-chat-client-svelte'
    }

    store = store;
    actionCreators = xChatActions;

    render(root) {
        renderSvelte(
            root,
            Client,
            this.actions
        )
    }
}