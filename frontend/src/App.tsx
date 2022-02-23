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

    render() {
        return (
            <div>
                <RoomIcon/>
            </div>
        );
    }

}

export default App;
