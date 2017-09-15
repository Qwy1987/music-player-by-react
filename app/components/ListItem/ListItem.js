/**
 * Created by qwy on 2017/9/15.
 */
import React, {Component} from 'react';
const PubSub = require('pubsub-js');
import styles from './listitem.less';

class ListItem extends Component {
    constructor(props) {
        super(props);
        ['deleteHandler', 'playMusic'].forEach((currValue) => {
            this[currValue] = this[currValue].bind(this);
        });
    }

    deleteHandler(e) {
        e.stopPropagation();
        e.preventDefault();
        const {item}=this.props;
        PubSub.publish('DEL_MUSIC', item);
    }

    playMusic(e) {
        const {item}=this.props;
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
                    onClick={this.deleteHandler}
                />
            </li>
        );
    }
}

export default ListItem