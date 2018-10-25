// @flow

export function html(strings: string[], ...args: any[]) {
    if (!args.length) {
        return strings[0]
    }

    let tpl: string = "";
    for (let i = 0; i < strings.length; i++) {
        tpl += strings[i];
        if (i < strings.length - 1) {
            if (Array.isArray(args[i])) {
                tpl += args[i].join("");
            } else {
                tpl += args[i]
            }
        }
    }
    return tpl
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