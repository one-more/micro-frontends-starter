import React from 'react';
import {storiesOf} from '@storybook/react';
import {store} from "./simple-store"
import {changeStoreImplementation} from "../dist/main"
import "./components/hello-world"
import "./components/clock"
import "./components/greeter"
import "./components/counter"
import "./components/todo-list"
import "./components/button"
import Table from "./performance-tests/table"

changeStoreImplementation(store);

storiesOf('Component', module)
    .add('hello world', () => <hello-world></hello-world>)
    .add('clock', () => <x-clock></x-clock>)
    .add('without shadow dom', () => <x-greeter name="greeter!"></x-greeter>)
    .add('counter', () => <x-counter start="5"></x-counter>)
    .add('todo list', () => <todo-list></todo-list>)

storiesOf('Button', module)
    .add('default', () => <x-button>default btn</x-button>)
    .add('size medium', () => <x-button size="m">medium btn</x-button>)
    .add('size large', () => <x-button size="l">medium btn</x-button>)
    .add('info', () => <x-button type="info">info btn</x-button>)
    .add('danger', () => <x-button type="danger">danger btn</x-button>)
    .add('success', () => <x-button type="success">success btn</x-button>)

storiesOf('Performance tests', module)
    .add('table', () => <Table />)
