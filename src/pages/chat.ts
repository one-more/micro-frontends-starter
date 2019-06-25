import {define} from "@micro-frontends/core";
import {XChatClientSvelte, XChatDisplay} from "~/modules/x-chat";
import {XChatClientVue} from "~/modules/x-chat/components/x-chat-client-vue";

define(XChatClientSvelte);
define(XChatDisplay);
define(XChatClientVue);