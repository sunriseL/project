import React from 'react';

let video,canvas,context;

function jietu(){
    var video = document.getElementById("video");//获取前台要截图的video对象，
    var canvas = document.querySelectorAll('canvas')[0];//获取前台的canvas对象，用于作图
    var ctx = canvas.getContext('2d');//设置canvas绘制2d图，
    var width = 480;//设置canvas宽
    var height = 270;//设置canvas高
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(video, 0, 0, width, height);//将video视频绘制到canvas中
    ctx.beginPath();
    ctx.arc(100,75,10,0,2*Math.PI);
    ctx.fillStyle="red";
    ctx.fill();
   // var images = canvas.toDataURL('image/png');//canvas的api中的toDataURL（）保存图像
}

class Test extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }
    componentDidMount(){
        video = document.getElementById('video');
        video.src='http://mvpc.eastday.com/vzixun/20171017/20171017115054761305610_1_06400360.mp4';
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        context.drawImage(video, 100, 100, 480, 320,);
    }

    render(){
        return(
           <div>
               <video id="video" width="640" height="480" controls="controls"
                      src="http://mvpc.eastday.com/vzixun/20171017/20171017115054761305610_1_06400360.mp4" autoplay></video>
               <button id="snap" onClick={() => jietu()}>拍照</button>
               <canvas id="canvas" width="640" height="480"></canvas>
               <canvas id="canvas1" width="640" height="480"></canvas>
           </div>
        );
    }
}

export default Test;