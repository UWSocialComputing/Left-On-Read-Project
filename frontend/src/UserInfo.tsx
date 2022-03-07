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
    const tabInformation = JSON.parse(this.props.currTabInfo);
    const url = tabInformation.url;
    let tabLabel = `On ${url}`;
    let favicon = tabInformation.favUrl;

    const titleStyle = {
      paddingTop: "0px",
      padding: "0px"
    }

    const cardStyle = {
      leftPadding: "20px",
      padding: "0px",
      height: "auto",
      minHeight: "0px",
    }

    if (url === undefined) {
      tabLabel = "Idle";
      favicon = "https://www.google.com/favicon.ico";
    }

    return (
      <Card size="small" title={this.props.name} style={{ width: 200 }} headStyle={titleStyle} bodyStyle={cardStyle}>
        <Space align="baseline">
          <Image width={16} preview={false} src={favicon} />
          <p>{tabLabel}</p>
        </Space>
      </Card>
    );
  }
}

export default UserInfo;
