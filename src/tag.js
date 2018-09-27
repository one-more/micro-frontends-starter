// @flow

type TemplateHandler = (raw: string, args: any[]) => string

class EventHandlers {
    targetNo: number = 0;

    constructor() {
        window.muskotListeners = {}
    }

    register(event: string, fn: Function): string {
        for (const i in window.muskotListeners) {
            const listener = window.muskotListeners[i];
            if (listener === fn) {
                return `on${event}="muskotListeners[${i}]()"`
            }
        }
        window.muskotListeners[this.targetNo] = fn;
        return `on${event}="muskotListeners[${this.targetNo++}]()"`
    }
}

const eventHandlers = new EventHandlers();

const handlers = [
    (raw: string, args: any[]) => {
        return raw.replace(/on(\w+)="__ARG__(\d+)"/ig, (match: string, event: string, index: number) => {
            return eventHandlers.register(event.toLowerCase(), args[index])
        })
    }
];

export default function html(strings: string[], ...args: any[]) {
    if (!args.length) {
        return strings[0]
    }

    const ARG = "__ARG__";
    let acc = "";
    for (let i = 0; i < strings.length; i++) {
        acc += strings[i];
        if (i < strings.length - 1) {
            acc += ARG + i
        }
    }
    return handlers.reduce(
        (str: string, next: Function) => next(str, args),
        acc
    ).replace(/__ARG__(\d)/g, (match: string, index: number) => {
        return String(args[index])
    })
}

export function addTemplateHandler(fn: any) {
    handlers.push(fn)
}