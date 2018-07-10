import React from 'react';
import { Button } from 'antd';
import $ from 'jquery';


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
               <video id="video" width="480" height="320" controls>
               </video>
               <div>
                   <button id="capture">拍照</button>
               </div>
               <canvas id="canvas" width="480" height="320"></canvas>
           </div>
        );
    }
}

export default Test;