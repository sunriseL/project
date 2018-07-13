import React from 'react';


function jietu(){
    let video = document.getElementById("video");//获取前台要截图的video对象，
    let canvas = document.querySelectorAll('canvas')[0];//获取前台的canvas对象，用于作图
    let ctx = canvas.getContext('2d');//设置canvas绘制2d图，
    canvas.width = 480;
    canvas.height = 270;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);//将video视频绘制到canvas中
    ctx.beginPath();
    ctx.arc(150,75,10,0,2*Math.PI);
    ctx.fillStyle="red";
    ctx.fill();
   // var images = canvas.toDataURL('image/png');//canvas的api中的toDataURL（）**保存图像，待实现
}

class Test extends React.Component {
    render(){
        return(
           <div>
               <video id="video" width="640" height="480" controls="controls"
                      src="http://mvpc.eastday.com/vzixun/20171017/20171017115054761305610_1_06400360.mp4" autoplay></video>
               <button id="snap" onClick={() => jietu()}>截图</button>
               <canvas id="canvas" width="640" height="480"></canvas>
           </div>
        );
    }
}

export default Test;