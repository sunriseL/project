import React from 'react';
import file from '../image/2.mp4';


function screenShot(){
    let video = document.getElementById("video");
    let canvas = document.querySelectorAll('canvas')[0];
    let ctx = canvas.getContext('2d');
    canvas.width = 480;
    canvas.height = 270;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    let image = canvas.toDataURL('image/png');
    console.log(image);
}

class Test extends React.Component {
    render(){
        return(
           <div>
               <video id="video" width="640" height="480" controls
                  src={file}   autoplay></video>
               <button id="snap" onClick={() => screenShot()}>截图</button>
               <canvas id="canvas" width="640" height="480"></canvas>
           </div>
        );
    }
}

export default Test;