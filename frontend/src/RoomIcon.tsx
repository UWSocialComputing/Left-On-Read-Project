import React, {Component} from 'react';
import {Avatar, Tooltip, Card} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UserInfo from './UserInfo';

interface RoomIconProps {
    name: String,       // The name of this person in the room
    avatar: String,     // File name of this person's profile pic
    user_name: String,
}

interface RoomIconState {
    flash: any;
}

/**
 * Represents an icon of a person in the current 'Room'
 */
class RoomIcon extends Component<RoomIconProps, RoomIconState> {
    blink_interval: any;
    fetch_interval: any;
    count: any;
    key_array: any;
    key_array_idx: any;

    static BLINK_TIME = 250; // 0.25 second
    static FETCH_TIME = 1200; // 1.2 Seconds

    static flash_off_style = {
        outline: "none",
    }
    
    constructor(props: any) {
        super(props);
        this.state = {
            flash: RoomIcon.flash_off_style
        };
        this.blink_interval = null;
        this.fetch_interval = null;
        this.key_array = [0, 0, 0, 0];
        this.key_array_idx = 0;
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
                console.log("key array is " + this.key_array);
                // this.count = 0;
                // this.interval = setInterval(() => this.blinkIcon(keyboard_activity[this.count]), RoomIcon.BLINK_TIME);
                
            });
            
        }, RoomIcon.FETCH_TIME);

        
        this.blink_interval = setInterval(() => {
            this.key_array_idx++;
            this.blinkIcon(this.key_array[this.key_array_idx]);

            if (this.key_array_idx >= this.key_array.length) 
                this.key_array_idx = 0;
        }, RoomIcon.BLINK_TIME);

    }

    componentWillUnmount() {
        clearInterval(this.blink_interval);
        clearInterval(this.fetch_interval);
    }

    blinkIcon(activity: number) {
        const flash_on_style = {
            outline: "none",
            borderColor: "#fc9402",
            boxShadow: " 0 0 10px #fc9402",
        }

        const flash_off_style = {
            outline: "none",
        }

        // activity is an array 
        if (activity === 1) {
            console.log("blink");
            this.setState({flash: flash_on_style});
        } else {
            console.log("off");
            this.setState({flash: flash_off_style});
        }
        this.count++;
    }

    render() {

        return (
            <div>
                <Tooltip placement="right" title={<UserInfo name={this.props.name}/>}>
                    <Avatar size={64} src={this.props.avatar} style={this.state.flash}/>
                </Tooltip>
            </div>
        );  
    }
}

export default RoomIcon;