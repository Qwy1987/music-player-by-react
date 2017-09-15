/**
 * Created by qwy on 2017/9/14.
 * 包裹组件 相当于app的入口
 */

import React, {Component} from 'react';

import {Header} from './components/Header';
import {Player} from './page/Player';
import {MusicList} from './page/MusicList';

import {MUSIC_LIST, ONCE, CYCLE, RANDOM} from './config/config';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            musicList: MUSIC_LIST,//可播放列表
            currentMusicItem: MUSIC_LIST[0], //当前正在播放的歌曲信息
            repeatType: RANDOM //播放模式
        }
    }

    componentDidMount() {
        const file = this.state.currentMusicItem.file;
        //player的初始化放在公共组件中 切换页面时不影响播放
        $("#player").jPlayer({
            ready: function () {
                $(this).jPlayer('setMedia', {
                    mp3: file
                }).jPlayer('play');
            },
            supplied: 'mp3',
            wmode: 'window'
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <Player
                    currentMusicItem={this.state.currentMusicItem}
                    repeatType={this.state.repeatType}
                />
                <MusicList
                    musiclist={MUSIC_LIST}
                    currentMusicItem={this.state.currentMusicItem}
                />
            </div>
        );
    }
}


export default App;