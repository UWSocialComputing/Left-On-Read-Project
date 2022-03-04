import React, {Component} from 'react';
import {Card, Space, Image} from 'antd';

interface UserInfoProps {
    name: String,
    currTab: String,
}


class UserInfo extends Component<UserInfoProps, {}> {

    render() {
        let tabLabel = `On ${this.props.currTab}`;
        let favicon = "https://www.google.com/favicon.ico";
        
        if (this.props.currTab === undefined) {
            tabLabel = "Idle";
            favicon = "";
        }

        return (
            <Card title={this.props.name} style={{width: 200}}>
                <Space align="baseline">
                    <Image width={16} preview={false} src={favicon}/>
                    <p>{tabLabel}</p>
                </Space>
            </Card>
        );
    }
}

export default UserInfo;