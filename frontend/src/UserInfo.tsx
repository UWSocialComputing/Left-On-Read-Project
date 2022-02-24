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
    interval: any;

    constructor(props: any) {
        super(props);
        // TODO: data polled from server or something
        this.state = {
            currWpm: 100,
            currTab: "Google Drive",
        };
        this.interval = null;
    }

    getWpm() {
        this.setState(state => ({
            currWpm: Math.floor(Math.random() * 70) + 50 // hard-coded random WPM for now
        }));
    }
    
    componentDidMount() {
        this.interval = setInterval(() => this.getWpm(), 2000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <Card title={this.props.name} style={{width: 200}}>
                <p>WPM: {this.state.currWpm}</p>
                <p>Current tab: {this.state.currTab}</p>
            </Card>
        );
    }
}

export default UserInfo;