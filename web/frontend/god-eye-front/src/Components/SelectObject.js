import React from 'react';
import '../App.css';
import { Grid } from '../../node_modules/@material-ui/core';
import $ from "jquery";
import emitter from "../Utils/EventEmitter";

let canvas,time,x1,y1,x2,y2,imgUrl;
function sendSelectedImg(){
    $.ajax({
        type: "post",
        url: "http://localhost:8081/target/choose",
        crossDomain: true,
        dataType:"json",
        data: {imgStream: imgUrl},
        success: function (data) {
            console.log(data);
        },
        error : function(data) {
            console.log('error');
        }
    })
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

function getCurrentFrame() {
    let player = document.getElementById('video_id');
    console.log(player.currentTime);
    screenShot();
}

function screenShot(){
    canvas = document.getElementById('screenShot');
    currentFrameCanvas();
    let image = canvas.toDataURL('image/png');
    $.ajax({
        type: "post",
        url: "http://localhost:8081/target/choose",
        crossDomain: true,
        dataType:"json",
        data: {imgStream: image},
        success: function (data) {
            console.log(data);
            for(let i in data.pictures) {
                console.log(data.pictures[i].data);
            }
        },
        error : function(data) {
            console.log('error'+data);
        }
    })
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
        getCurrentFrame();
        emitter.removeAllListeners('sendSelectedImg');
        emitter.on('sendSelectedImg',sendSelectedImg);
    }

    render(){
        return(
            <Grid  container xs={12} spacing={16} >
                <div className="centerDiv">
                <Grid item xs >
                    <canvas id="screenShot"  />
                </Grid>
                </div>
                <div className="centerDiv">
                <Grid item xs >
                    <canvas id = "canvasCut" />
                </Grid>
                </div>
            </Grid>
        );
    }
}

export default SelectObject;