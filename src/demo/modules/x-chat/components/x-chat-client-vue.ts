import {Component} from "~/core";
import Vue from 'vue'
import ChatClient from "./chat-client.vue"

Vue.config.productionTip = false;

export class XChatClientVue extends Component {
    static getName(): string {
        return 'x-chat-client-vue'
    }

    render(root: HTMLDivElement) {
        new Vue({
            el: root,
            template: "<ChatClient />",
            components: { ChatClient }
        })
    }
}