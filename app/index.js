/**
 * Created by qwy on 2017/9/14.
 * webpack entry file
 */
// const React = require('react');  使用了babel可以用import导入文件
import React, {Component}from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

import App from './App';

ReactDOM.render(
    <AppContainer>
        <App/>
    </AppContainer>,
    document.getElementById('root')
);
if (module.hot) {
    module.hot.accept('./App', () => {
        const App = require('./App').default;
        ReactDOM.render(
            <AppContainer>
                <App />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}