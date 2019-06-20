import {Component, retrieve, store} from "../core";
import {Subscription} from "./models";
import {addHistoryChangeListener} from "./history";

const pageLoadingKey = Symbol("pageLoading");
const loadingPromiseKey = Symbol("pageLoadingPromise");

export class XContent extends Component {
    static getName(): string {
        return 'x-content'
    }

    get loading(): boolean {
        return retrieve(pageLoadingKey);
    }

    set loading(value: boolean) {
        store(
            pageLoadingKey,
            value,
        )
    }

    get loadingPromise(): Promise<void> {
        return retrieve(loadingPromiseKey);
    }

    set loadingPromise(value: Promise<void>) {
        store(
            loadingPromiseKey,
            value,
        )
    }

    get content() {
        const tpl = retrieve(this.contentKey) as HTMLTemplateElement;
        if (tpl) {
            return tpl.content.querySelector(`#${this.id}`)
        }
        return null
    }

    get contentKey(): string {
        return location.pathname;
    }

    get defaultURL(): string {
        return this.getAttribute("default");
    }

    get contentURL(): string {
        let url = this.defaultURL;
        if (location.pathname !== "/") {
            url = location.pathname
        }
        return url ? url + ".html" : ""
    }

    subscription: Subscription;

    connected() {
        this.subscription = addHistoryChangeListener(
            () => {
                this.loadData().then(() => {
                    this.update()
                })
            }
        )
    }

    disconnected() {
        this.subscription.unsubscribe()
    }

    loadData(): Promise<void> {
        if (!this.loading && this.contentURL) {
            this.loading = true;
            this.loadingPromise = fetch(this.contentURL)
                .then(resp => resp.text())
                .then((data: string) => {
                    this.loading = false;

                    const tpl: HTMLTemplateElement = document.createElement("template");
                    tpl.innerHTML = data;

                    store(this.contentKey, tpl)
                })
                .catch((err) => {
                    this.loading = false;
                    throw err
                })
        }
        return this.loadingPromise || Promise.resolve()
    }

    render(root: ShadowRoot | HTMLDivElement) {
        const content = this.content;
        if (content) {
            this.insertContent(root, content)
        } else {
            this.loadData().then(() => {
                this.insertContent(root, this.content)
            })
        }
    }

    insertContent(root: ShadowRoot | HTMLDivElement, content: Element) {
        if (content) {
            root.innerHTML = "";
            root.appendChild(content)
        }
    }
}