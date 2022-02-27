import React, {Component} from 'react';
import {Avatar, Tooltip, Card} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import UserInfo from './UserInfo';

interface RoomIconProps {
    name: String,
}

/**
 * Represents an icon of a person in the current 'Room'
 */
class RoomIcon extends Component<RoomIconProps, {}> {

    render() {
        return (
            <div>
                <Tooltip placement="right" title={<UserInfo name={this.props.name}/>}>
                    <Avatar size={64} icon={<UserOutlined />} />
                </Tooltip>
            </div>
        );  
    }
}

export default RoomIcon;