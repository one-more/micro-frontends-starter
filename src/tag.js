// @flow

export function css(ctx: Object) {
    return (strings: string[], ...args: any[]) => {
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
}