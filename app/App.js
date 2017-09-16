/**
 * Created by qwy on 2017/9/14.
 * 包裹组件 相当于app的入口
 */

import React, {Component} from 'react';
//全局事件订阅管理器
const PubSub = require('pubsub-js');
import styles from './app.less';

//公共部分的组件可在顶层组件中展示
import Header from './components/Header';


import {MUSIC_LIST, ONCE, CYCLE, RANDOM} from './config/config';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            musicList: MUSIC_LIST,//可播放列表   //默认全部
            currentMusicItem: MUSIC_LIST[0], //当前正在播放的歌曲信息  //默认设置为第一首
            repeatType: RANDOM //播放模式   //默认为随机播放
        };

        ['playMusic', 'playWhenEnd', 'playNextMusic', 'findMusicIndex'].forEach((currValue) => {
            this[currValue] = this[currValue].bind(this);
        });

    }

    componentDidMount() {
        //player的初始化设置
        $("#player").jPlayer({
            supplied: 'mp3',
            wmode: 'window'
        });

        //默认页面一加载就开始播放
        this.playMusic(this.state.currentMusicItem);

        //对应于播放结束事件的监听
        $("#player").bind($.jPlayer.event.ended, (e) => {
            this.playWhenEnd();
        });

        /** 全局事件的订阅 ******************************************************************/

        //删除一首
        PubSub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
            this.setState({
                musicList: this.state.musicList.filter(
                    (item) => {
                        return musicItem.id !== item.id;
                    }
                )
            });
        });
        //指定播放
        PubSub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMusic(musicItem);
        });

        //播放上一曲
        PubSub.subscribe('PLAY_PREV', () => {
            this.playNextMusic('prev');
        });

        //播放下一曲
        PubSub.subscribe('PLAY_NEXT', () => {
            this.playNextMusic();
        });

        const repeatTypes = [ONCE, CYCLE, RANDOM];

        //更改播放模式
        PubSub.subscribe('CHANAGE_REPEAT', () => {
            const index = repeatTypes.indexOf(this.state.repeatType);
            let newIndex = (index + 1) % repeatTypes.length;
            this.setState({
                repeatType: repeatTypes[newIndex]
            });
        });

        /** 全局事件的订阅 ******************************************************************/
    }


    //当音乐播放结束后将如何播放
    playWhenEnd() {
        switch (this.state.repeatType) {
            case RANDOM://随机播放
                const currentMusicItem = this.state.currentMusicItem;
                const newList = this.state.musicList.filter(
                    (item) => {
                        return currentMusicItem.id !== item.id;
                    }
                );
                const newIndex = Math.floor(Math.random() * newList.length);
                const musicItem = newList[newIndex];
                this.playMusic(musicItem);
                break;
            case ONCE://单曲循环
                this.playMusic(this.state.currentMusicItem);
                break;
            default://顺序循环播放
                this.playNextMusic();
                break;
        }
    }

    //即将播放下一曲
    playNextMusic(type = 'next') {
        const index = this.findMusicIndex(this.state.currentMusicItem); //查询当前播放的歌曲的索引值
        const len = this.state.musicList.length;
        let newIndex = null;
        if (type === 'next') {  //下一曲
            newIndex = (index + 1) % len;
        } else { //上一曲
            newIndex = (index + len - 1) % len;
        }
        const musicItem = this.state.musicList[newIndex]; //即将播放的歌曲信息
        this.playMusic(musicItem);

    }

    //查询单曲在音乐列表数组中的索引位置
    findMusicIndex(musicItem) {
        let index = this.state.musicList.indexOf(musicItem);
        return Math.max(0, index);
    }

    //播放指定音乐
    playMusic(musicItem) {

        const file = musicItem.file;
        //播放文件设置
        $("#player").jPlayer('setMedia', {
            mp3: file
        }).jPlayer('play');
        //更新当前播放的音乐信息
        this.setState({
            currentMusicItem: musicItem
        });
    }

    componentWillUnMount() {
        $("#player").unbind($.jPlayer.event.ended);
        /*解绑全局事件的订阅*/
        PubSub.unsubscribe('DELETE_MUSIC');
        PubSub.unsubscribe('PLAY_MUSIC');
        PubSub.unsubscribe('PLAY_NEXT');
        PubSub.unsubscribe('PLAY_PREV');
        PubSub.unsubscribe('CHANAGE_REPEAT');
    }

    /*
     * React.cloneElement()
     * 克隆组件并传值
     * */
    render() {
        return (
            <div className={styles.container}>
                <Header/>
                {React.cloneElement(this.props.children, this.state)}
            </div>
        );
    }
}


export default App;