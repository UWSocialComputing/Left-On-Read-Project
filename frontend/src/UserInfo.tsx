import React, {Component} from 'react';
import {Card} from 'antd';

interface UserInfoProps {
    name: String,
    currTab: String,
}


class UserInfo extends Component<UserInfoProps, {}> {

    render() {
        return (
            <Card title={this.props.name} style={{width: 200}}>
                <p>Current tab: {this.props.currTab}</p>
            </Card>
        );
    }
}

export default UserInfo;