import React from 'react';
import { Button } from 'antd';

class Test extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    test(){
        let params = {"name":"abc"};
        fetch('http://localhost:8081/test', {
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