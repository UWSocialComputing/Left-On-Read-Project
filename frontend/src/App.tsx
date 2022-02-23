import React, {Component} from 'react';
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
                <p id="app-title">Chrome Extension thing</p>
                
            </div>
        );
    }

}

export default App;
