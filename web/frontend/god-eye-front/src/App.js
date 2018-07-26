import React, { Component } from 'react';
import './App.css';
import MainNav from './Components/MainNav';
import $ from 'jquery';
import Videocam from '@material-ui/icons/Videocam';

class App extends Component {
    ifDBEmpty(){
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:8081/has_map",
            async: false,
            crossDomain: true,
            success: function (data) {
                if(data===0){
                    localStorage.setItem('ifDBEmpty', 'true');
                }else{
                    localStorage.setItem('ifDBEmpty', 'false');
                }
            },
            error : function() {
                console.log("something went wrong");
            }
        })
    }

    getDefaultMap(){
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:8081/get_new_map",
            async: false,
            crossDomain: true,
            success: function (data) {
                console.log(data);
                localStorage.setItem('currentMapBin', data);
            },
            error : function() {
                console.log("something went wrong");
            }
        })
    }

    componentDidMount(){
        this.ifDBEmpty();
        if(localStorage.getItem('ifDBEmpty')==='false')
            this.getDefaultMap();
        console.log("ifDBEmpty:"+localStorage.getItem('ifDBEmpty'));
        localStorage.setItem('selectedCamera','camera1');
    }   

    componentWillUnmount(){
        localStorage.clear();
    }
    render() {
        return (
            <div className="App">
                <MainNav />
                <Videocam id='cam-icon-light' fill='red' hidden/>
                <Videocam id='cam-icon' fill='blue' hidden/>
            </div>
        );
    }
}

export default App;
