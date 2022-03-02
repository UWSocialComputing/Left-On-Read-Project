import React, {Component} from 'react';
import {Avatar, Tooltip, Card} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UserInfo from './UserInfo';

interface RoomIconProps {
    name: String,       // The name of this person in the room
    avatar: String,     // File name of this person's profile pic
}

interface RoomIconState {
    flash: any;
}

/**
 * Represents an icon of a person in the current 'Room'
 */
class RoomIcon extends Component<RoomIconProps, RoomIconState> {
    interval: any;

    static BLINK_TIME = 500;

    static flash_off_style = {
        outline: "none",
    }

    constructor(props: any) {
        super(props);
        this.state = {
            flash: RoomIcon.flash_off_style
        };
        this.interval = null;
    }

    componentDidMount() {
        const roomUrl = "https://twyd.herokuapp.com/room/";

        fetch(roomUrl)
            .then(response => response.json())
            .then(data => {
                var result = data.filter((obj: { name: String; }) => {return obj.name === this.props.name});
                var keyboard_activity = result['keyboard_activity'];
                for (var i = 0; i < keyboard_activity.length; i++) {
                    this.interval = setInterval(() => this.blinkIcon(keyboard_activity[i]), RoomIcon.BLINK_TIME);
                }
            });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    blinkIcon(activity: number) {
        const flash_on_style = {
            outline: "none",
            borderColor: "#3369ff",
            boxShadow: " 0 0 10px #9ecaed",
        }

        const flash_off_style = {
            outline: "none",
        }

        if (activity === 1) {
            this.setState({flash: flash_on_style});
        } else {
            this.setState({flash: flash_off_style});
        }
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