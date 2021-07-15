#!/usr/bin/env node

import './init';
import React from 'react';
import { render } from 'ink';
import App from './App';
import PageProvider from './Components/PageContext';
import StorageProvider from './Storage';

const Root = () => {
    return <PageProvider><StorageProvider><App /></StorageProvider></PageProvider>;
};
 
render(<Root />);