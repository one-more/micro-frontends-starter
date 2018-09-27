import React from 'react';
import {storiesOf} from '@storybook/react';
import {store} from "./simple-store"
import {changeStoreImplementation} from "../dist/main"
import "./components/hello-world"
import "./components/clock"
import "./components/greeter"
import "./components/counter"

changeStoreImplementation(store);

storiesOf('Component', module)
    .add('hello world', () => <hello-world></hello-world>)
    .add('clock', () => <x-clock></x-clock>)
    .add('without shadow dom', () => <x-greeter name="greeter!"></x-greeter>)
    .add('counter', () => <x-counter start="5"></x-counter>)
