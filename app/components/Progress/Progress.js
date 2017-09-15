/**
 * Created by qwy on 2017/9/15.
 * 播放器进度条组件
 */
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

import styles from './progress.less';

class Progress extends Component {
    constructor(props) {
        super(props);

        this.changeProgress = this.changeProgress.bind(this);
    }

    changeProgress(e) {
        //通过refs获取真实DOM元素
        let progressBar = ReactDOM.findDOMNode(this.refs.progressBar);
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
        this.props.onProgressChange && this.props.onProgressChange(progress);
        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        const {progress,barColor}=this.props;
        return (
            <div className={styles.progress}
                 ref="progressBar"
                 onClick={this.changeProgress}>
                <div
                    className={styles.progressBar}
                    style={{width: `${progress}%`,backgroundColor:barColor}}
                />
            </div>
        );
    }
}

export default Progress;