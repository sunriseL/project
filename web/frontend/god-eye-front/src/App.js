import React, { Component } from 'react';
import './App.css';
import MainNav from './Components/MainNav';
import $ from 'jquery';

class App extends Component {
    ifDBEmpty(){
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:8081/has_map",
            crossDomain: true,
            success: function (data) {
                if(data===0){
                    return 'true';
                }else{
                    return 'false';
                }
            },
            error : function() {
                alert("something went wrong");
            }
        })

        // return 'false';
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
