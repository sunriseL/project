import React from 'react';
import { Button } from 'antd';

class Test extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    test(){
        fetch('http://localhost:8081/test',
            {
                method: 'POST',
                mode: 'cors',
            }).then(response =>{
                console.log("Request Successful",response);
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