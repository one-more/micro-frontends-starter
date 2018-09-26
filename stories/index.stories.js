import React from 'react';
import {storiesOf} from '@storybook/react';
import {changeStoreImplementation} from "../dist/main"
import {store} from "./simple-store"
import HelloWorld from "./components/hello-world"

changeStoreImplementation(store);

storiesOf('Component', module)
    .add('hello world', () => <hello-world></hello-world>);
