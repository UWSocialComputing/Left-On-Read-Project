import React, {Component} from 'react';
import {Layout} from 'antd';
import RoomIcon from './RoomIcon';

interface AppState {
    // TODO
}

/**
 * Holds the main extension as a container showing icons of users in the current 'Room'
 */
class App extends Component<{}, AppState> { 

    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    // TODO for later: generate x number of RoomIcon components
    // based on number of people in room atm. hard-coded for now
    render() {
        return (
            <div>
                <RoomIcon name="John Doe"/>
                <RoomIcon name="Per Sonne"/>
                <RoomIcon name="Ash Ketchum"/>
            </div>
        );
    }

}

export default App;
