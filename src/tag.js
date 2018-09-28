// @flow

interface TemplateHandler {
    call(raw: string, args: any[]): string
}

interface TemplateEventsHandler extends TemplateHandler {
    unloadEvents(component: HTMLElement): void
}

class EventsTagHandler implements TemplateEventsHandler {
    targetNo: number = 0;

    constructor() {
        window.muskotListeners = []
    }

    registerEvent = (event: string, fn: Function) => {
        for (const i in window.muskotListeners) {
            const listener = window.muskotListeners[i];
            if (listener === fn) {
                return `on${event}="muskotListeners[${i}]()"`
            }
        }
        window.muskotListeners[this.targetNo] = fn;
        return `on${event}="muskotListeners[${this.targetNo++}]()"`
    };

    call = (raw: string, args: any[]) => {
        return raw.replace(/on(\w+)="__ARG__(\d+)"/ig, (match: string, event: string, index: number) => {
            return this.registerEvent(event.toLowerCase(), args[index])
        })
    };

    unloadEvents = (component: HTMLElement) => {
        let root = component;
        if(component.shadowRoot) {
            root = component.shadowRoot
        }
        let match;
        const regExp = /muskotListeners\[(\d+?)\]/g;
        const str = root.innerHTML;
        const removeIndexes = {};
        while (match = regExp.exec(str)) {
            removeIndexes[match[1]] = true
        }
        window.muskotListeners = window.muskotListeners.filter((el: Function, i: number) => {
            return !removeIndexes[i]
        });
        this.targetNo = window.muskotListeners.length
    }
}

const MapHandler = {
    call: (raw: string, args: any[]) => {
        return raw.replace(
            /<(\w+)\s+(.*)map="(__ARG__(\d+))"(.*)>([\s\S]*)<\/\1>/gm,
            (match: string, tag: string, attributes, arg, arrIndex) => {
                const arr = args[arrIndex];
                const template = match.replace(/map=".*"/, '');
                return arr.map(el => {
                    return template.replace(/__ARG__(\d+)/g, (match: string, index: number) => {
                        const fn = args[index];
                        if (typeof fn === "function")
                            return fn(el);
                        return fn
                    })
                })
            }
        )
    }
};

const coreHandlers = {
    events: new EventsTagHandler,
    map: MapHandler
};

const customHandlers = {};

let handlers = [
    coreHandlers.map.call,
    coreHandlers.events.call,
];

export default function html(strings: string[], ...args: any[]) {
    if (!args.length) {
        return strings[0]
    }

    const ARG = "__ARG__";
    let acc: string = "";
    for (let i = 0; i < strings.length; i++) {
        acc += strings[i];
        if (i < strings.length - 1) {
            acc += ARG + i
        }
    }
    return handlers.reduce(
        // $FlowFixMe
        (str: string, next: Function) => next(str, args),
        acc
    ).replace(/__ARG__(\d)/g, (match: string, index: number) => {
        return String(args[index])
    })
}

export function addTemplateHandler(key:string, handler: TemplateHandler): void {
    customHandlers[key] = handler;
    // $FlowFixMe
    handlers.unshift(handler.call)
}

export function accessHandler(key: string): TemplateHandler {
    return customHandlers[key]
}

export function unloadHandler(key: string): void {
    const handler = customHandlers[key];
    handlers = handlers.filter(el => el !== handler.call)
}

export function setEventsHandler(handler: TemplateEventsHandler): void {
    coreHandlers.events = handler
}

export function unloadEvents(component: HTMLElement): void {
    coreHandlers.events.unloadEvents(component)
}