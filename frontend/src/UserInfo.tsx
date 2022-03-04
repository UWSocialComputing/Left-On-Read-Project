import React, { Component } from "react";
import { Card, Space, Image } from "antd";

interface UserInfoProps {
  name: String;
  currTabInfo: any;
}

/**
 * Represents a card showing information about the current user
 * Currently shows a user's current tab
 */
class UserInfo extends Component<UserInfoProps, {}> {
  render() {
    const url = JSON.parse(this.props.currTabInfo).url;
    let tabLabel = `On ${url}`;
    let favicon = `https://www.${url}/favicon.ico`;

    if (url === undefined) {
      tabLabel = "Idle";
      favicon = "";
    }

    return (
      <Card title={this.props.name} style={{ width: 200 }}>
        <Space align="baseline">
          <Image width={16} preview={false} src={favicon} />
          <p>{tabLabel}</p>
        </Space>
      </Card>
    );
  }
}

export default UserInfo;
