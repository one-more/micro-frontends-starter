import {Component} from "~/core";
import ChatClient from "./chat-client.vue"
import {renderVue} from "~/framework";

export class XChatClientVue extends Component {
    static getName(): string {
        return 'x-chat-client-vue'
    }

    render(root: HTMLDivElement) {
        renderVue(
            ChatClient,
            root,
        )
    }
}