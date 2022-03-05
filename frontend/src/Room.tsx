import { Component } from "react";
import { Space, Card } from "antd";
import User from "./User";

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
  }

  componentWillUnmount() {
    clearInterval(this.send_interval);
  }

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
                  name={user.alias}
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
