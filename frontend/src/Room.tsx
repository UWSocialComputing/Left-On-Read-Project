import React, {Component} from 'react';
import {Space, Card} from 'antd';
import RoomIcon from './RoomIcon';

//import {getKeyboardActivity} from './getActivityUtil.js';

interface AppState {
    currUsers: JSX.Element[]
}

/**
 * Holds the main extension as a container showing icons of users in the current 'Room'
 */
class Room extends Component<{}, AppState> { 
    // "Sign-up" process
    static USER_NAME = "Lor_Reade";
    static ALIAS = "LOR";

    constructor(props: any) {
        super(props);
        this.state = {
            currUsers: []
        };
    }

    componentDidMount() {
        this.getUsersInRoom();
        this.sendUserData();
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
        // Sends PUT request about current user 
        // current tab + keyboard activity

        let userData = {
            current_tab: "YouTube",
            keyboard_activity: "[1,1,1,1]"
        }
        
        const sendDataURL = "https://twyd.herokuapp.com/status/" + Room.USER_NAME;
        console.log(JSON.stringify(userData));
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
        
    }

    render() {
        return (
            <Space direction="vertical">
                <Card title="Room 1" style={{width: 300}}>
                    {this.state.currUsers}
                </Card>
            </Space>
        );
    }
}

export default Room;
