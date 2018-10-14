// @flow

import {callHandlers} from "./handlers";
import {attributeStarts, createTagArg} from "./utils";

export function html(strings: string[], ...args: any[]) {
    if (!args.length) {
        return strings[0]
    }

    let tpl: string = "";
    for (let i = 0; i < strings.length; i++) {
        tpl += strings[i];
        if (i < strings.length - 1) {
            if (Array.isArray(args[i]) && attributeStarts(tpl) === false)
                tpl += args[i].join('');
            else if (typeof args[i] === "function" || typeof args[i] === "object")
                tpl += createTagArg(i);
            else
                tpl += args[i]
        }
    }
    const template = document.createElement("template");
    template.innerHTML = tpl;
    callHandlers(template.content, args);
    return template
}

export function css(strings: string[], ...args: any[]) {
    let result = '';
    for (let i = 0; i < strings.length; i++) {
        result += strings[i];
        if (i < strings.length - 1) {
            if (typeof args[i] === "function")
                result += args[i]();
            else
                result += args[i]
        }
    }
    return result
}