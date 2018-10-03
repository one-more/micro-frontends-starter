// @flow

interface TemplateHandler {
    call(node: Node, args: any[]): void
}

export const propsMap: Map<any, any> = new Map;

function clearPropsMap() {
    for (const key of propsMap.keys()) {
        if (!document.contains(key)) {
            propsMap.delete(key)
        }
    }
}

const EventsTagHandler: TemplateHandler = {
    call: (node: any, args: any[]) => {
        const attributes = node.attributes || [];
        for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i];
            if (attribute.nodeName.startsWith("on")) {
                const match = attribute.nodeValue.match(/__ARG__(\d+)/);
                if (match && match[1]) {
                    const index = Number(match[1]);
                    const listener = args[index];
                    if (typeof listener === "function") {
                        node.removeAttribute(
                            attribute.nodeName
                        );
                        node.addEventListener(
                            attribute.nodeName.toLowerCase().slice(2),
                            listener
                        );
                    }
                }
            }
        }
    }
};

const MapHandler: TemplateHandler = {
    call: (node: Node, args: any[]) => {
        if (node instanceof HTMLTemplateElement) {
            if (node.hasAttribute("map")) {
                const match = String(node.getAttribute("map")).match(/__ARG__(\d+)/);
                if (match && match[1]) {
                    const index = Number(match[1]);
                    const arr = args[index];
                    const tpl = node.innerHTML;
                    const fragment = document.createDocumentFragment();
                    arr.forEach(el => {
                        return tpl.replace(/__ARG__(\d+)/g, (match, index) => {
                            const arg = args[index];
                            if (typeof arg === "function") {
                                const tplCall = arg(el);
                                if (tplCall instanceof HTMLTemplateElement) {
                                    fragment.appendChild(tplCall.content)
                                } else {
                                    const tmpTpl = document.createElement("template");
                                    tmpTpl.innerHTML = tplCall;
                                    fragment.appendChild(tmpTpl.content)
                                }
                            }
                            return arg
                        })
                    });
                    // $FlowFixMe
                    node.parentNode.replaceChild(
                        fragment,
                        node
                    )
                }
            }
        }
    }
};

const PropsHandler: TemplateHandler = {
    call: (node: any, args: any[]) => {
        const attributes = node.attributes || [];
        for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i];
            const match = attribute.nodeValue.match(/__ARG__(\d+)/);
            if (match && match[1]) {
                const index = Number(match[1]);
                const props = propsMap.get(node) || {};
                node.removeAttribute(
                    attribute.nodeName
                );
                propsMap.set(
                    node,
                    {
                        ...props,
                        [attribute.nodeName]: args[index]
                    }
                );
            }
        }
    }
};

const coreHandlers = {
    events: EventsTagHandler,
    map: MapHandler,
    props: PropsHandler
};

const customHandlers = {};

let handlers: Array<Function> = [
    coreHandlers.map.call,
    coreHandlers.events.call,
    coreHandlers.props.call,
];

export default function html(strings: string[], ...args: any[]) {
    if (!args.length) {
        return strings[0]
    }

    const ARG = "__ARG__";
    let tpl: string = "";
    for (let i = 0; i < strings.length; i++) {
        tpl += strings[i];
        if (i < strings.length - 1) {
            if (typeof args[i] === "function" || typeof args[i] === "object")
                tpl += ARG + i;
            else
                tpl += args[i]
        }
    }
    const template = document.createElement("template");
    template.innerHTML = tpl;
    callHandlers(template.content, args);
    return template
}

function callHandlers(element: DocumentFragment | Node, args: any[]): void {
    handlers.forEach(handler => {
        handler(element, args);
        for (let i = 0; i < element.childNodes.length; i++) {
            callHandlers(
                element.childNodes[i],
                args
            )
        }
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

export function setEventsHandler(handler: TemplateHandler): void {
    coreHandlers.events = handler
}