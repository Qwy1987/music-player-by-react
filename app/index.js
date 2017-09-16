/**
 * Created by qwy on 2017/9/14.
 * webpack entry file
 * 入口文件仅加载路由组件
 */
// const React = require('react');
// 使用了babel等es6转译工具可以用import导入文件
import React, {Component}from 'react';
import ReactDOM from 'react-dom';
//提供热加载
import {AppContainer} from 'react-hot-loader';

import Routes from './Routes';

ReactDOM.render(
    <AppContainer>
        <Routes/>
    </AppContainer>,
    document.getElementById('root')
);
if (module.hot) {
    module.hot.accept('./Routes', () => {
        const Routes = require('./Routes').default;
        ReactDOM.render(
            <AppContainer>
                <Routes />
            </AppContainer>,
            document.getElementById('root')
        );
    });
}