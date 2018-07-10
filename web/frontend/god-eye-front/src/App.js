import React, { Component } from 'react';
import './App.css';
import MainNav from './Components/MainNav';

class App extends Component {
    ifDBEmpty(){
        return 'false';
    }

    componentDidMount(){
        localStorage.setItem('ifMapChanged', 'true');
        localStorage.setItem('currentMapBin', '');
        localStorage.setItem('ifDBEmpty', this.ifDBEmpty());
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
