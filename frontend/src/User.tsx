import React, {Component} from 'react';
import {Avatar, Tooltip, Card} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UserInfo from './UserInfo';

interface UserProps {
    name: String,       // The name of this person in the room
    avatar: String,     // File name of this person's profile pic
    user_name: String,
    currTab: String,
    
}

interface UserState {
    flash: any,
}

/**
 * Represents an icon of a person in the current 'Room'
 */
class User extends Component<UserProps, UserState> {
    fetch_interval: any;
    key_array: any;
    tabObj: any;

    static BLINK_TIME = 82; // Blink Duration 0.08 seconds (around the time between keys being held)
    static FETCH_TIME = 1200; // Fetch Interval Duration 1.2 Seconds

    static flash_off_style = { // CSS style for non-blinking state
        outline: "none",
    }
    static flash_on_style = { // CSS style for blinking state
        outline: "none",
        borderColor: "#fc9402",
        boxShadow: "0 0 10px #fc9402",
    }
    
    constructor(props: any) {
        super(props);
        this.state = {
            flash: User.flash_off_style,
        };
        this.fetch_interval = null;
        this.key_array = [];
        this.tabObj = {};
    }

    componentDidMount() {
        const roomUrl = "https://twyd.herokuapp.com/room/";

        // Set to fetch for keyboard data every FETCH_TIME (1.2 seconds)
        this.fetch_interval = setInterval(() => {
            fetch(roomUrl)
            .then(response => response.json())
            .then(data => {
                var result = data.filter((obj: { user_name: String; }) => {return obj.user_name === this.props.user_name});

                this.key_array = result[0].keyboard_activity;
                this.tabObj = JSON.parse(result[0].current_tab);
                
                console.log(this.tabObj);
                this.executeBlinkSchedule(this.key_array);
            });
            
        }, User.FETCH_TIME);
    }

    componentWillUnmount() {
        clearInterval(this.fetch_interval);
    }

    executeBlinkSchedule(schedule: Array<number>) {
        for (const delay of schedule) {
            setTimeout(() => this.blink(), delay)
        }
    }

    blink() {
        this.setState({flash: User.flash_on_style});
        setTimeout(() => this.setState({flash: User.flash_off_style}), User.BLINK_TIME)
    }

    render() {

        return (
            <div>
                <Tooltip placement="right" title={<UserInfo name={this.props.name} currTab={this.tabObj.url}/>}>
                    <Avatar size={64} src={this.props.avatar} style={this.state.flash}/>

                </Tooltip>
            </div>
        );  
    }
}

export default User;