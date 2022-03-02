import React, {Component} from 'react';
import {Avatar, Tooltip, Card} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UserInfo from './UserInfo';

interface RoomIconProps {
    name: String,       // The name of this person in the room
    avatar: String,     // File name of this person's profile pic
}

/**
 * Represents an icon of a person in the current 'Room'
 */
class RoomIcon extends Component<RoomIconProps, {}> {

    render() {
        const flash_on_style = {
            outline: "none",
            borderColor: "#3369ff",
            boxShadow: " 0 0 10px #9ecaed",
        }

        const flash_off_style = {
            outline: "none",
        }

        // conditional check this

        return (
            <div>
                <Tooltip placement="right" title={<UserInfo name={this.props.name}/>}>
                    <Avatar size={64} src={this.props.avatar} style={flash_on_style}/>
                </Tooltip>
            </div>
        );  
    }
}

export default RoomIcon;