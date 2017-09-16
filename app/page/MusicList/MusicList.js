/**
 * Created by qwy on 2017/9/15.
 */
import React, {Component} from 'react';
import styles from './musiclist.less';
import ListItem from '../../components/ListItem';

class MusicList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {musicList, currentMusicItem} = this.props;
        const Items = musicList.map(function (currentItem) {
            /*
            *  key:必需 唯一 字符串 方便diff计算
            *  item:当前歌曲信息 对象
            *  focus:当前歌曲是否是应用中真正播放的歌曲 布尔值
            * */
            return (
                <ListItem
                    key={currentItem.id}
                    item={currentItem}
                    focus={currentMusicItem.id === currentItem.id}
                />
            );
        });
        return (
            <ul className={styles.musiclist}>
                {Items}
            </ul>
        );
    }
}

export default MusicList;