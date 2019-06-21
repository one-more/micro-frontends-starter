import {Component} from "~/core";
import Client from "./chat-client.svelte"

export class XChatClientSvelte extends Component {
    static getName() {
        return 'x-chat-client-svelte'
    }

    render(root) {
        new Client({
            target: root,
        })
    }
}