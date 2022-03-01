import React, {Component} from 'react';
import {Space, Card} from 'antd';
import RoomIcon from './RoomIcon';

interface AppState {
    currUsers: JSX.Element[]
}

/**
 * Holds the main extension as a container showing icons of users in the current 'Room'
 */
class App extends Component<{}, AppState> { 

    constructor(props: any) {
        super(props);
        this.state = {
            currUsers: []
        };
    }

    componentDidMount() {
        this.getUsersInRoom();
    }

    // Fetches current users in the room from the server.
    getUsersInRoom = () => {
        // TODO: GET request to get users from server
        let fetchedUsers = [
            {
                "user_name": "Ora",
                "avatar": "https://raw.githubusercontent.com/UWSocialComputing/Left-On-Read-Project/frontend-structure/frontend/resources/ora.jpeg",
            },
            {
                "user_name": "Dana",
                "avatar": "https://raw.githubusercontent.com/UWSocialComputing/Left-On-Read-Project/frontend-structure/frontend/resources/dana.jpeg",
            },
            {
                "user_name": "Raleigh",
                "avatar": "https://raw.githubusercontent.com/UWSocialComputing/Left-On-Read-Project/frontend-structure/frontend/resources/raleigh.jpeg",
            },
        ];

        let roomIconData = [];
        
        // Loop through the server data and create avatar components for each
        for (var i = 0; i < fetchedUsers.length; i++) {
            const user = fetchedUsers[i];
            roomIconData.push(<RoomIcon name={user.user_name} avatar={user.avatar}/>);
        }

        this.setState({
            currUsers: roomIconData
        });
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

export default App;
