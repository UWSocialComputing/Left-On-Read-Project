import React, {Component} from 'react';
import {Space, Card} from 'antd';
import RoomIcon from './RoomIcon';

interface AppState {
    currUsers: Array<RoomIcon>
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

    // TODO for later: generate x number of RoomIcon components
    // based on number of people in room atm. hard-coded for now
    
    // TODO: GET request to fill currUsers array with users from the current room 
    render() {
        return (
            <Space direction="vertical">
                <Card title="Room 1" style={{width: 300}}>
                    <RoomIcon name="John Doe"/>
                    <RoomIcon name="Per Sonne"/>
                    <RoomIcon name="Ash Ketchum"/>
                </Card>
            </Space>
        );
    }
}

export default App;
