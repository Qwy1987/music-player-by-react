/**
 * Created by qwy on 2017/9/16.
 * 仅作路由管理
 */
import React, {Component} from 'react';
import {Router, IndexRoute, Route, hashHistory} from 'react-router';

import App from './App'; //顶层组件可包含公共部分
import PlayerPage from './page/Player';  //音乐播放组件
import MusicListPage from './page/MusicList'; //音乐列表组件
import NotFoundPage from './NotFound';  //404组件


class Routes extends Component {
    constructor() {
        super(...arguments);
    }
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={PlayerPage}/>
                    <Route path="player" component={PlayerPage}/>
                    <Route path="list" component={MusicListPage}/>
                    <Route path="*" component={NotFoundPage}/>
                </Route>
            </Router>
        );
    }
}

export default Routes;