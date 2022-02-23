import React, {Component} from 'react';
import {Avatar, Tooltip, Card} from 'antd';
import { UserOutlined } from '@ant-design/icons';

/**
 * Represents an icon of a person in the current 'Room'
 */
class RoomIcon extends Component<{}, {}> {

    render() {
        return (
            <div>
                <Tooltip placement="right" title={<Card/>}>
                    <Avatar size={64} icon={<UserOutlined />} />
                </Tooltip>
            </div>
        );  
    }
}

export default RoomIcon;