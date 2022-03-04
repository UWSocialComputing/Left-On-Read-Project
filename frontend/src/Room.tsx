import { Component } from "react";
import { Space, Card } from "antd";
import User from "./User";
import { KeyboardReader } from "./getActivityUtil";

interface AppState {
  currUsers: JSX.Element[];
  tabInfo: { url: string; favUrl: string };
}

/**
 * Holds the main extension as a container showing icons of users in the current 'Room'
 */
class Room extends Component<{}, AppState> {
  send_interval: any;

  // "Sign-up" process
  static ROOM_NAME = "twyd room";
  static USER_NAME = "LOR_USER";
  static ALIAS = "Lora Reed";

  // PUT time interval
  static PUT_TIME = 1000;

  constructor(props: any) {
    super(props);
    this.state = {
      currUsers: [],
      tabInfo: { url: "", favUrl: "" },
    };
    this.send_interval = null;
  }

  componentDidMount() {
    this.getUsersInRoom();
    this.sendUserData();
  }

  componentWillUnmount() {
    clearInterval(this.send_interval);
  }

  getTab = () => {
    chrome.runtime.sendMessage("tab", (response) => {
      // Extract domain name from url
      let domain = "";
      let favurl = "";

      if (response == null || response.url.toString() === "" || response.url.toString() == null) {
        domain = "chrome";
      } else {
        domain = new URL(response.url.toString()).hostname.replace("www.", "");
      }

      // Get the favicon url, use chrome default if undefined
      if (response == null || response.favURL == null || response.favURL === undefined) {
        favurl = "https://www.google.com/favicon.ico";
      } else {
        favurl = response.favURL;
      }

      this.setState({
        tabInfo: { url: domain, favUrl: favurl },
      });
    });
  };

  // Fetches current users in the room from the server.
  getUsersInRoom = () => {
    const usersURL = "https://twyd.herokuapp.com/users/";
    const roomURL = "https://twyd.herokuapp.com/room/";

    let roomData: Array<any>;

    // Retrieve users in current room from the server
    fetch(roomURL)
      .then((response) => response.json())
      .then((data) => {
        roomData = data;
      })
      .then(() => {
        // Do a second fetch to get the users' avatars
        fetch(usersURL)
          .then((response) => response.json())
          .then((avatarData) => {
            let userData = [];

            for (var i = 0; i < avatarData.length; i++) {
              let user = roomData[i];
              let avatar = avatarData[i];

              // Create User components for each user in the room
              userData.push(
                <User
                  name={user.name}
                  avatar={avatar.avatar}
                  user_name={user.alias}
                  currTab={user.current_tab}
                  keyboardActivity={user.keyboard_activity}
                />
              );
            }

            this.setState({
              currUsers: userData,
            });
          });
      });
  };

  sendUserData = () => {
    const sendDataURL =
      "https://twyd.herokuapp.com/status/" + Room.USER_NAME + "/";

    // Sends PUT request about current user
    // current tab + keyboard activity
    const KR = new KeyboardReader(Room.PUT_TIME + 5); // Offset by 5 to send out right before sample actually resets

    this.send_interval = setInterval(() => {
      this.getTab();
      let userData = {
        // "{ url:" + tabInfo.url, favUrl: tabInfo.favUrl + "}"
        current_tab: JSON.stringify(this.state.tabInfo),
        keyboard_activity: "[" + KR.getArray().toString() + "]",
      };

      fetch(sendDataURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, Room.PUT_TIME);
  };

  render() {
    return (
      <Space direction="vertical">
        <Card title={Room.ROOM_NAME} style={{ width: 300 }}>
          {this.state.currUsers}
        </Card>
      </Space>
    );
  }
}

export default Room;
