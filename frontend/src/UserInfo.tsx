import React, {Component} from 'react';
import {Card} from 'antd';

interface UserInfoProps {
    name: String,
}

interface UserInfoState {
    currWpm: number,
    currTab: String,
}

class UserInfo extends Component<UserInfoProps, UserInfoState> {

    constructor(props: any) {
        super(props);
        // TODO: data polled from server or something
        this.state = {
            currWpm: 100,
            currTab: "Google Drive",
        };
    }
    
    render() {
        return (
            <Card title={this.props.name} style={{width: 300}}>
                <p>WPM: {this.state.currWpm}</p>
                <p>Current tab: {this.state.currTab}</p>
            </Card>
        );
    }
}

export default UserInfo;