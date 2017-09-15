/**
 * Created by qwy on 2017/9/15.
 */
import React, {Component} from 'react';
import {Link} from 'react-router';
const PubSub = require('pubsub-js');
import {Progress} from '../../components/Progress';
import styles from './player.less';


/*
 * 秒数转为mm:ss的格式
 * @time 单位为s
 * */
function formatTime(time) {
    const s = Math.floor(time);
    let miniute = Math.floor(s / 60);
    let seconds = Math.floor(s % 60);

    return miniute + ':' + (seconds < 10 ? '0' + seconds : seconds);
}

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: "-", //播放进度条
            duration: 0,  //播放总时长
            volume: 0,      //播放音量
            isPlay: true,   //播放状态
            leftTime: ''    //剩余时长
        };
        ['propgressChangeHandler', 'changeVolumeHandler', 'play', 'next', 'prev', 'changeRepeat'].forEach((currValue) => {
            this[currValue] = this[currValue].bind(this);
        });
    }

    componentDidMount() {
        $("#player").bind($.jPlayer.event.timeupdate, (e) => {
            this.setState({
                progress: Math.round(e.jPlayer.status.currentPercentAbsolute).toFixed(3),
                duration: e.jPlayer.status.duration,
                volume: e.jPlayer.options.volume * 100,
                leftTime: formatTime(e.jPlayer.status.duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100))
            });
        })
    }

    componentWillUnmount() {
        $("#player").unbind($.jPlayer.event.timeupdate);
    }

    //拖动进度条事件处理
    propgressChangeHandler(progress) {
        const time = this.state.duration * progress;
        //让音乐播放至相应时长
        $("#player").jPlayer('play', time);
        this.setState({
            progress,
            isPlay: true
        });
    }

    //调整音量事件处理
    changeVolumeHandler(progress) {
        $("#player").jPlayer("volume", progress);
    }

    //点击播放按钮事件处理
    play() {
        if (this.state.isPlay) {
            $("#player").jPlayer("pause");
        } else {
            $("#player").jPlayer("play");
        }
        this.setState({
            isPlay: !this.state.isPlay
        });
    }

    //点击下一曲事件处理
    next() {
        PubSub.publish('PLAY_NEXT');
    }

    //点击上一曲事件处理
    prev() {
        PubSub.publish('PLAY_PREV');
    }

    //点击播放循环模式事件处理
    changeRepeat() {
        PubSub.publish('CHANAGE_REPEAT');
    }

    render() {
        const {progress, volume, leftTime}=this.state;
        const {title, artist, cover}=this.props.currentMusicItem;
        const {repeatType}=this.props;
        return (
            <div className={styles.playerPage}>
                <h1 className={styles.caption}><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20 row">
                    <div className={styles.controllWrapper}>
                        <h2 className={styles.musicTitle}>{title}</h2>
                        <h3 className={styles.musicArtist}>{artist}</h3>
                        <div className="row mt20">

                            <div className={styles.leftTime}>-{leftTime}</div>

                            <div className={styles.volumeContainer}>
                                <i className="icon-volume rt" style={{top: 5, left: -5}}/>
                                <div className={styles.volumeWrapper}>
                                    <Progress
                                        progress={volume}
                                        onProgressChange={this.changeVolumeHandler}
                                        barColor='#f00'
                                    />
                                </div>
                            </div>
                        </div>

                        <div style={{height: 10, lineHeight: '10px'}}>
                            <Progress
                                progress={progress}
                                onProgressChange={this.changeProgressHandler}
                                barColor='#2f9842'
                            >
                            </Progress>
                        </div>

                        <div className="mt20 row">
                            <div>
                                <i className="icon prev" onClick={this.prev}/>

                                <i className={`icon ${this.state.isPlay ? 'pause' : 'play'}`}
                                   onClick={this.play}/>

                                <i className="icon next"
                                   onClick={this.next}/>
                            </div>
                            <div className="-col-auto">
                                <i className={`icon repeat-${repeatType}`}
                                   onClick={this.changeRepeat}/>
                            </div>
                        </div>

                    </div>

                    <div className={`${styles.cover} -col-auto`}>
                        <img src={cover} alt={title}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;