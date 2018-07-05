import React, { Component } from 'react';
import './App.css';
import PersistentDrawer from './Components/TestDrawer.js';

class App extends Component {
    render() {
        return (
            <div className="App">
                <PersistentDrawer />
            </div>
        );
    }
}

export default App;
