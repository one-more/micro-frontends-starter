import React from 'react';
import {storiesOf} from '@storybook/react';
import "./simple-store"
import "./components/hello-world"
import "./components/clock"
import "./components/greeter"

storiesOf('Component', module)
    .add('hello world', () => <hello-world></hello-world>)
    .add('clock', () => <x-clock></x-clock>)
    .add('without shadow dom', () => <x-greeter name="greeter!"></x-greeter>)
