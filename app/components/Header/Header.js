/**
 * Created by qwy on 2017/9/14.
 * player header component
 */

import React, {Component} from 'react';
import styles from './header.less';

class Header extends Component {
    render() {
        return (
            <div className={styles.header}>
                <img className={styles.logo} src="/static/images/logo.png" alt="logo"/>
                <h1 className={styles.caption}>React Music Player</h1>
            </div>
        );
    }
}

export default Header;