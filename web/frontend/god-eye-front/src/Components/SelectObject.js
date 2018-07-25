import React from 'react';
import '../App.css';
import Typography from '../../node_modules/@material-ui/core/Typography';
import $ from "jquery";
import emitter from "../Utils/EventEmitter";
import Divider from '../../node_modules/@material-ui/core/Divider';
import VideoPlayer from "./VideoPlayer";

let canvas,time,x1,y1,x2,y2,imgUrl;

function sendSelectedImg(){
    console.log('sendSelectedImg');
    $.ajax({
        type: "post",
        url: "http://localhost:8081/target/trace",
        crossDomain: true,
        dataType:"json",
        data: {imgStream: imgUrl},
        success: function (data) {
            drawRoute(data);
        },
        error: function(err) {
            console.log(err);
        }
    })
}

function drawRoute(data){
    // data should be formatted as JSONArray as [{cameraId: , x: , y: , relativeTime: , absoluteTime , }]
    // backend should return only (x, y) or similar array
    console.log(data);
    let c = document.getElementById('screenShot');
    let ctx = c.getContext('2d');
    let h = c.height;
    let w = c.width;
    for(let i = 0; i < data.length; i++){
        console.log(data[i].x,data[i].y,data[i].time);
        drawPoint(ctx, i, +data[i].x*w, +data[i].y*h,data[i].time);
    }
}

function drawPoint(ctx,i,x,y,time) {
    setTimeout(function() {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'red';
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.beginPath();
        ctx.font = "10px Courier New";
        ctx.fillText(time, x + 5, y);
        ctx.fill();
     }, 400 * i);
}

function currentFrameCanvas(){
    let video = document.getElementById("video_id");
    canvas = document.getElementById('screenShot');
    let ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 600;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
}

function select(x1,y1,x2,y2){
    currentFrameCanvas();
    let ctx = canvas.getContext('2d');
    ctx.strokeStyle="#0000ff";
    ctx.lineWidth = 3;
    ctx.rect(x1,y1,x2-x1,y2-y1);
    ctx.stroke();
    let cut = document.getElementById("canvasCut");
    let cutContext = cut.getContext('2d');
    cut.width = Math.abs(x2-x1);
    cut.height = Math.abs(y2-y1);
    cutContext.drawImage(canvas,x1,y1,x2-x1,y2-y1,0,0,Math.abs(x2-x1),Math.abs(y2-y1));
    imgUrl = cut.toDataURL('image/png');
}

function getEventPosition(ev){
    let x, y;
    if (ev.layerX || ev.layerX === 0) {
        x = ev.layerX;
        y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX === 0) {
        x = ev.offsetX;
        y = ev.offsetY;
    }
    return {x: x, y: y};
}

function selectObj(e){
    if(time === 0) {
        let p = getEventPosition(e);
        x1 = p.x;
        y1 = p.y;
        time++;
    } else {
        let p = getEventPosition(e);
        x2 = p.x;
        y2 = p.y;
        select(x1,y1,x2,y2);
        time = 0;
    }
}

class SelectObject extends React.Component {
    componentDidMount(){
        canvas = document.getElementById('screenShot');
        time = 0;
        window.setTimeout(function () {
            canvas.removeEventListener('click', selectObj, false);
            canvas.addEventListener('click', selectObj, false);
            }, 500);
        currentFrameCanvas();
        emitter.removeAllListeners('sendSelectedImg');
        emitter.on('sendSelectedImg',sendSelectedImg);
    }

    render(){
        return(
            <div>
                <div className="centerDiv">
                        <canvas id="screenShot" style={{margin: '1%'}} />
                </div>
                <div className="centerDiv" style={{alignContent: 'center'}}>
                    <Divider />
                    <div className='centerDiv'>
                        <Typography variant='display1'>截取图像如下</Typography>
                    </div>
                    <canvas id = "canvasCut" />
                    <canvas id = "searchResult" />
                    <VideoPlayer id = "checkVideo" />
                </div>
            </div>
        )
    }
}

export default SelectObject;