import React, {Component} from 'react';
import {Space, Card} from 'antd';
import RoomIcon from './RoomIcon';
import { KeyboardReader } from './getActivityUtil';

//import {getKeyboardActivity} from './getActivityUtil.js';

interface AppState {
    currUsers: JSX.Element[]
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
    static KR = new KeyboardReader(this.PUT_TIME + 5); // Offset by 5 to send out right before sample actually resets
    
    constructor(props: any) {
        super(props);
        this.state = {
            currUsers: []
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

    // Fetches current users in the room from the server.
    getUsersInRoom = () => {
        const usersURL = "https://twyd.herokuapp.com/users/";

        // Retrieve users in current room from the server
        fetch(usersURL)
            .then(response => response.json())
            .then(data => {
                let roomIconData = [];
        
                // Loop through the server data and create avatar components for each
                for (var i = 0; i < data.length; i++) {
                    const user = data[i];
                    roomIconData.push(<RoomIcon name={user.alias} avatar={user.avatar} user_name={user.user_name}/>);
                }
        
                this.setState({
                    currUsers: roomIconData
                });
            });
    }

    sendUserData = () => {
        const sendDataURL = "https://twyd.herokuapp.com/status/" + Room.USER_NAME + "/";
        // Sends PUT request about current user 
        // current tab + keyboard activity
        this.send_interval = setInterval(() => {
            let userData = {
                current_tab: "YouTube", // TODO
                keyboard_activity: "[" + Room.KR.getArray().toString() + "]"
            }
            console.log(userData.keyboard_activity)
            fetch(sendDataURL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            .then(response => response.json())
            .then(data => {console.log('Success:', data)})
            .catch((error) => {console.error('Error:', error)});
        }, Room.PUT_TIME);
        
    }

    render() {
        return (
            <Space direction="vertical">
                <Card title={Room.ROOM_NAME} style={{width: 300}}>
                    {this.state.currUsers}
                </Card>
            </Space>
        );
    }
}

export default Room;
