# muskot js
The most minimalistic js framework.
What do you need to write front-end applications in 2018?
Components? - Web Components!
JSX? - template literals!
Single store? YES!
And routing - that's it!

## Getting started
Let's get starting writing components

### render
render method of component must return string. it can be either
simple string
````es6
import {Component, registerComponent} from "muskot"

export default class MyComponent extends Component {
    render() {
        return html`
            <div>
                greet the world
            </div>
        `
    }
}

registerComponent('my-component', MyComponent);
````

or with string, processed with out tag function `html`

````es6
import {Component, registerComponent, html} from "muskot"

export default class MyComponent extends Component {
    greet = () => {
        alert("Hello world!")
    }
    
    render() {
        return html`
            <button onClick=${this.greet} >
                greet the world
            </button>
        `
    }
}

registerComponent('my-component', MyComponent);
````

out of the box `html` function can process event handlers; it's functionality 
can be enhanced - read about iy below;

it's important to register every component by registerComponent function

### shadow dom
There is simple boolean flag that indicates whether create shadow root or not.
shadow root itself is accessible as `this.shadowRoot` 
````es6
import {Component, html} from "muskot"

export default class MyComponent extends Component {
    get isShadow() {
        return true; // returns true by default
    }
    
    greet = () => {
        alert("Hello world!")
    }
    
    render() {
        return html`
            <button onClick=${this.greet} >
                greet the world
            </button>
        `
    }
}
````

### single store
There is build-in store and simple interface to use it
````es6
interface State {}

interface Reducer {
    state: State,
    actions: {
        [index: string]: (state: any, ...params: any[]) => Promise<State> | State
    }
}

interface Store {
    registerReducer(key: string, reducer: Reducer) => void,
    removeReducer(key: string) => boolean,
    subscribe(key: string, cb: Function) => {unsubscribe: Function},
    getState(key: string) => void,
    migrate(newStore: Store) => Store
}
````

State is available through the `this.state` property.

Interface is
````es6
interface ComponentState {
    [key: string]: State, // state part by key
    [key: string]: Function, //state part actions
}
````

Declaring state and connecting component to store.
````es6
import {Component, html} from "muskot"
import {registerReducer} from "muskot-store"

const reducer = {
    state: [],
    actions: {
        add(state, text) {
          const todo = {
            id: getNextId(),
            done: false,
            text
          }
          return state.concat(todo)
        },
        done(state, id) {
            return state.map(todo => {
              if (todo.id == id) {
                return {
                  ...todo,
                  done: !todo.done
                }
              }
              return todo
            })
        },
        remove(state, id) {
            return state.filter(todo => todo.id != id)
        }
    }
}

const key = "myKey";

registerReducer(key, reducer);

export default class MyComponent extends Component {
    // subscription to store reducers by keys
    get keys() {
        return [myKey]
    }
    
    renderItem(item) {
        return `<li><${item.text}/li>`
    }
    
    render() {
        return html`
            <div>
                ${this.state.myKey.map(this.renderItem)}
            </div>
            <input type="text" >
            <button onClick="${event => this.state.add(event.target.value)}" >
                add
            </button>
        `
    }
}
````

### routing
Layout Component
````es6
import {Component} from "muskot"

export default class Layout extends Component {
    render() {
        return `
            <div>
                <slot name="header"></slot>
                <slot></slot> <!-- <- default slot -->
            </div>
        `
    }
}
````

Header Component
````es6
import {Component} from "muskot"

export default class Header extends Component {
    render() {
        return `
            <header>Simple header</header>
        `
    }
}
````

Body Component
````es6
import {Component} from "muskot"

export default class Body extends Component {
    render() {
        return `
            <main>Page body</main>
        `
    }
}
````

router config and render
````es6
import {render} from "muskot-router"
import Layout from "./Layout"
import Header from "./Header"
import Body from "./Body"

const routes = {
    layout: Layout,
    '/': { // path pattern
        'header': Header,
        'default': Body
    }
}

render(
    document.getElementById("app"),
    routes
)
````

matching path patterns
````
/:id - router named param
/:id? - optional named param 
````

routes can be added dynamically
````es6
import {addRoutes} from "muskot-router"
import Profile from "./Profile"

addRoutes({
    '/:id': Profile
})
````

router params are stored in state and can be accessed by key router;
params object has following interface
````es6
interface RouterParams {
    route: string,
    params: {
        [index: string]: string
    },
    query: {
        [index: string]: string
    },
    hash: string
}
````

## Going deeper
### enhance `html` functionality
Custom handler must have following interface
````es6
interface TemplateHandler {
    call(raw: string, args: any[]) => string
}
````
to add custom handler
````es6
import {addTemplateHandler} from "muskot"
const myHandler = {}
```` 

### replace store implementation
It's possible to change store implementation without rewriting code;
to add another implementation it has to implement following interface
````es6
interface StoreImplementation {
    addReducer(key: string, reducer: Reducer) => void,
    removeReducer(key: string) => boolean,
    subscribe(key: string, cb: Function) => { unsubscribe: Function },
    getState(key: string) => void,
    migrate(newStore: Store) => Store
}
````

changing implementation
````es6
import {changeStoreImplementation} from "muskot"

const myImplemetation = {
    addReducer(key, reducer) {...},
    removeReducer(key) {...},
    subscribe(key, cb) {...},
    getState(key) {...},
    migrate(newStore) {...}
}

changeStoreImplementation(myImplementation)
````

### replace web components implementation
To change web component's implementation, you must create your own with
following interface
````es6
interface WebComponentsImplementation {
    registerComponent(name: string, component: Component) => boolean
}
````

changing implementation
````es6
import {changeWebComponentsImplemenation} from "muskot"

const myImplementation = {
    registerComponent(name, component) {...}
}

changeWebComponentsImplemenation(myImplamentation)
````
replace web components ready check
````es6
import {changeWebComponentsReadyCheck} from "muskot"

const myImplementation = () => new Promise(...)

changeWebComponentsReadyCheck(myImplementation)
````

### replace router implementation
To change router implementation, you must create your own with
following interface
````es6
interface Slots {
    [name: string]: Component
}

interface RouterImplementation {
    navigate(path: string, routes) => RouterParams,
    render(target: HTMLElement, layout: Component, slots: Slots) => void
}
````

changing implementation
````es6
import {changeRouterImplemenation} from "muskot-router"

const myImplementation = {
    navigate(path, routes) {...},
    render(target, layout, slots) {...}
}

changeRouterImplemenation(myImplamentation)
````

# Current status
Currently framework is heavily under development - contribution is welcome!