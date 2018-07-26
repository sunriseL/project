import React from 'react';
import '../App.css';
import Typography from '../../node_modules/@material-ui/core/Typography';
import $ from "jquery";
import emitter from "../Utils/EventEmitter";
import Divider from '../../node_modules/@material-ui/core/Divider';
import file from '../image/2.mp4';

let canvas,canvas1,time,x1,y1,x2,y2,imgUrl;
const width=900;
const height=600;
function sendSelectedImg(){
    console.log('sendSelectedImg');
    $.ajax({
        type: "post",
        url: "http://localhost:8081/target/trace",
        crossDomain: true,
        //async: false,
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
    for(let i = 0; i < data.length; i++){
        drawPoint(i, +data[i].x*width, +data[i].y*height,data[i].time);
    }
}

function drawPoint(i,x,y,time) {
    setTimeout(function() {
        console.log(x,y);
        let c = document.getElementById('searchResult');
        let ctx = c.getContext('2d');
        document.getElementById("checkVideo").currentTime = time;
        c.height = height;
        c.width = width;
        setTimeout(function() {
        ctx.strokeStyle="#0000ff";
        ctx.lineWidth = 3;
        ctx.rect(x-40,y-Math.abs(y2-y1),Math.abs(x2-x1),Math.abs(y2-y1));
        ctx.stroke()},300);
     }, 550 * i);
}

function currentFrameCanvas(){
    let video = document.getElementById("video_id");
    canvas = document.getElementById('screenShot');
    let ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 600;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    let c = document.getElementById('searchResult');
    c.height = height;
    c.width = width;
    c.getContext('2d').drawImage(video, 0, 0, c.width, c.height);
}

function select(x1,y1,x2,y2){
    currentFrameCanvas();
    let ctx = canvas.getContext('2d');
    ctx.strokeStyle="#0000ff";
    ctx.lineWidth = 3;
    ctx.rect(x1,y1,x2-x1,y2-y1);
    ctx.stroke();
    let cut = document.getElementById("canvasCut");
    cut.width = Math.abs(x2-x1);
    cut.height = Math.abs(y2-y1);
    cut.getContext('2d').drawImage(canvas,x1,y1,x2-x1,y2-y1,0,0,Math.abs(x2-x1),Math.abs(y2-y1));
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
        let video = document.getElementById('checkVideo');
        video.src = file;
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
                    <div className='centerDiv'style={{position:'relative' }}>
                        <Typography variant='display1'>追踪结果如下</Typography>
                        <canvas id = "searchResult"
                                style={{margin: '1%', width:900,height:600, position:'absolute' }} />
                        <video id = "checkVideo" style={{margin: '1%',width:900,height:600}} controls preload={true}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default SelectObject;