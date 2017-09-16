/**
 * Created by qwy on 2017/9/16.
 */

import React, {Component} from 'react';

class NotFound extends Component {
    constructor() {
        super(...arguments);
    }

    render() {
        return (
            <div style={{textAlign:"center"}}>
                404
                <br/>
                网络中断或网页不存在
            </div>
        );
    }
}
export default NotFound;
