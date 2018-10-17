// @flow

export function tagNameToProp(nodeName: string): string {
    return nodeName.split("-").reduce(
        (acc, next) => {
            if (next) {
                return acc + next[0].toUpperCase() + next.slice(1)
            }
            return acc
        }
    );
}

export function propNameToTag(prop: string): string {
    let res = "";
    for (let i = 0; i < prop.length; i++) {
        if (prop[i] === prop[i].toUpperCase()) {
            res += "-"+prop[i].toLowerCase()
        } else {
            res += prop[i]
        }
    }
    return res
}

export function createTagArg(index: number, startAttribute: boolean): string {
    if (startAttribute)
        return `__ARG__${index}`;
    return `<!--__ARG__${index}-->`
}

export function matchTagArg(str: string) {
    return str.match(/(?:<!--)?__ARG__(\d+)(?:-->)?/)
}

export function replaceTagArg(str: string, fn: Function) {
    return str.replace(/(?:<!--)?__ARG__(\d+)(?:-->)?/g, fn)
}

export function attributeStarts(str: string): boolean {
    return str.trim().slice(-2) === `="`
}