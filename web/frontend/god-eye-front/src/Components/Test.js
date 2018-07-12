import React from 'react';
import { Button } from 'antd';

class Test extends React.Component {
    constructor() {
        super();
        this.state = {

        }
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