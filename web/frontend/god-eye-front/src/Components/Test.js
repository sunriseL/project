import React from 'react';
import { Button } from 'antd';
import $ from 'jquery';

class Test extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    test(){
      /*  fetch('http://localhost:8081/test', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: 'abc' }),
        }).then(response =>{
            console.log("Request Successful", response);
            return response.json()
                .then(result =>{
                    console.log(result[0]);
                })
            })*/
            $.ajax({
                type: "get",
                url: "http://127.0.0.1:8081/get_new_map",
                crossDomain: true,
                success: function (data) {
                console.log(data);
            },
                error : function() {}
            })
    }

    render(){
        return(
           <div>
               <Button onClick={() => this.test()}> 跨域测试</Button>
           </div>
        );
    }
}

export default Test;