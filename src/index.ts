// @ts-ignore
import {define} from "./core";
import {XClockReact} from "./demo/components/x-clock/x-clock-react";
import {XLink} from "./framework/link";
import {XContent} from "./framework/content";
import {XClockSvelte} from "./demo/components/x-clock/x-clock-svelte";
import {XChatClientSvelte, XChatDisplay} from "~/demo/modules/x-chat";
import {XChatClientVue} from "~/demo/modules/x-chat/components/x-chat-client-vue";

define(XClockReact);
define(XLink);
define(XContent);
define(XClockSvelte);
define(XChatClientSvelte);
define(XChatDisplay);
define(XChatClientVue);