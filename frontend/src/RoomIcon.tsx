import React, {Component} from 'react';
import {Avatar} from 'antd';
import { UserOutlined } from '@ant-design/icons';

/**
 * Represents an icon of a person in the current 'Room'
 */
class RoomIcon extends Component<{}, {}> {

    render() {
        return (
            <div>
                <Avatar size={64} icon={<UserOutlined />} />
                <Avatar size={64} icon={<UserOutlined />} />
            </div>
        );  
    }
}

export default RoomIcon;