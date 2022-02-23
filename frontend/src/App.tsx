import React, {Component} from 'react';
import {DatePicker, Button} from 'antd';

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
                <DatePicker />
                <Button type="primary" style={{ marginLeft: 8 }}>
                Primary Button
                </Button>
            </div>
        );
    }

}

export default App;
