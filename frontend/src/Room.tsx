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
