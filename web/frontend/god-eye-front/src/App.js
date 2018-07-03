import React, { Component } from 'react';
import NavBar from './Components/NavBar.js';
import './App.css';
import MyRouter from './Components/MyRouter.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <MyRouter />
      </div>
    );
  }
}

export default App;
