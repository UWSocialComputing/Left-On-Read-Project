import React, { Component } from "react";
import { Avatar, Tooltip, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UserInfo from "./UserInfo";

interface UserProps {
  name: String; // The name of this person in the room
  avatar: String; // File name of this person's profile pic
  user_name: String;
  currTab: any;
  keyboardActivity: any;
}

interface UserState {
  flash: any;
  lastTime: any;
  dummy: boolean;
}

/**
 * Represents an icon of a person in the current 'Room' and the user's current information
 **/
class User extends Component<UserProps, UserState> {
  fetch_interval: any;
  render_interval: any;
  key_array: any;

  static BLINK_TIME = 82; // Blink Duration 0.08 seconds (around the time between keys being held)
  static FETCH_TIME = 1200; // Fetch Interval Duration 1.2 Seconds

  static flash_off_style = {
    // CSS style for non-blinking state
    outline: "none",
  };

  static flash_on_style = {
    // CSS style for blinking state
    outline: "none",
    borderColor: "#fc9402",
    boxShadow: "0 0 10px #fc9402",
  };

  constructor(props: any) {
    super(props);
    this.state = {
      flash: User.flash_off_style,
      lastTime: null,
      dummy: false,
    };
    this.fetch_interval = null;
    this.render_interval = null;
    this.key_array = [];
  }

  componentDidMount() {
    this.setState({lastTime: new Date().getTime()});

    // Set to fetch for keyboard data every FETCH_TIME (1.2 seconds)
    this.fetch_interval = setInterval(() => {
      this.executeBlinkSchedule(this.props.keyboardActivity);
    }, User.FETCH_TIME);

    this.render_interval = setInterval(() => this.setState({dummy : !this.state.dummy}), 100)
  }

  componentWillUnmount() {
    clearInterval(this.fetch_interval);
  }

  executeBlinkSchedule(schedule: Array<number>) {
    for (const delay of schedule) {
      setTimeout(() => this.blink(), delay);
    }
  }

  blink() {
    this.setState({ flash: User.flash_on_style, lastTime: new Date().getTime()});
    setTimeout(
      () => this.setState({ flash: User.flash_off_style }),
      User.BLINK_TIME
    );
  }


  render() {
    const textStyle = {
      lineHeight: "70px",
    }
    const timeElapsed = new Date().getTime() - this.state.lastTime;
    const decayFactor = Math.exp(-timeElapsed / 100).toString();
    // const decayFactor = Math.sin(new Date().getTime());
    // console.log(decayFactor);

    var decaying_border = {
      border: "1px solid rgba(255, 0, 0, " + decayFactor + ")",
      // border: "1px solid rgba(255, 0, 0, 1)",
    }
    // console.log(decaying_border);
    return (
      <div className="float-container">
        <div className="float-child-l">
          <Tooltip
            placement="right"
            color="white"
            className="tooltip-overlay"
            title={
              <UserInfo name={this.props.name} currTabInfo={this.props.currTab} />
            }
          >
            {/* <div>{(Math.sin(new Date().getTime() - this.state.lastTime)).toString()}</div> */}
            <Avatar size={64} src={this.props.avatar} style={decaying_border} />
          </Tooltip>
        </div>
        <div className="float-child-r"><p style={textStyle}>{this.props.name}</p></div>
      </div>
    );
  }
}

export default User;
