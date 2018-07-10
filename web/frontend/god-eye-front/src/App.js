import React, { Component } from 'react';
import './App.css';
import MainNav from './Components/MainNav';

class App extends Component {
    componentDidMount(){
        localStorage.setItem('ifMapChanged', 'true');
        localStorage.setItem('currentMapBin', '');
    }   

    componentWillUnmount(){
        localStorage.clear();
    }
    render() {
        return (
            <div className="App">
                <MainNav />
            </div>
        );
    }
}

export default App;
