/**
 * Created by qwy on 2017/9/15.
 */
import React, {Component} from 'react';
import styles from './musiclist.less';
import {ListItem} from '../../components/ListItem';

class MusicList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {musiclist, currentMusicItem} = this.props;
        const Items = musiclist.map(function (currItem) {
            return (
                <ListItem
                    key={currItem.id}
                    item={currItem}
                    focus={currentMusicItem === currItem}
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