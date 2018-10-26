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

export function parseAttributes(attributes: NamedNodeMap): Object {
    const result = {};
    for (const attribute of attributes) {
        result[tagNameToProp(attribute.name)] = attribute.value;
    }
    return result;
}

export function curry(fn: Function) {
    return (...args: any[]) => {
        if (args.length >= fn.length) {
            return fn.apply(null, args)
        }
        return curry(
            fn.bind(null, ...args)
        )
    }
}

export function compose(...fns: Function[]) {
    fns = fns.reverse();
    return (...args: any[]) => fns.reduce((res: any, fn) => Array.isArray(res) ? fn.apply(null, res) : fn(res), args)
}

export function not(value: any) {
    return !Boolean(value)
}