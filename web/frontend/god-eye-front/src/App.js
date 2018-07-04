import React, { Component } from 'react';
import NavBar from './Components/NavBar.js';
import './App.css';
import PersistentDrawer from './Components/TestDrawer.js';
import MyRouter from './Components/MyRouter.js';

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
