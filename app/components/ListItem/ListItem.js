/**
 * Created by qwy on 2017/9/15.
 */
import React, {Component} from 'react';
//全局事件订阅管理器
const PubSub = require('pubsub-js');
import styles from './listitem.less';

class ListItem extends Component {
    constructor(props) {
        super(props);
        ['deleteMusic', 'playMusic'].forEach((currValue) => {
            this[currValue] = this[currValue].bind(this);
        });
    }

    /*
    * 删除按钮元素嵌套在li元素里面
    * 点击删除会触发播放事件所以这里要阻止事件的冒泡
    * */
    deleteMusic(e) {
        e.stopPropagation();
        e.preventDefault();
        const {item}=this.props;
        //发起一个删除操作
        PubSub.publish('DELETE_MUSIC', item);
    }

    playMusic(e) {
        const {item}=this.props;
        //发起一个播放操作
        PubSub.publish('PLAY_MUSIC', item);
    }

    render() {
        const {item, focus}=this.props;
        return (
            <li
                className={`row ${styles.listitem} ${focus ? styles.focus : ''}`}
                onClick={this.playMusic}
            >
                <p><span className="bold">{item.title}</span> - item.artist</p>
                <p
                    className={`-col-auto ${styles.delete}`}
                    onClick={this.deleteMusic}
                />
            </li>
        );
    }
}

export default ListItem