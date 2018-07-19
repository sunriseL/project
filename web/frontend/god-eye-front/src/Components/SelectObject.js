import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import file1 from '../image/2.mp4';
import '../App.css';
import { Grid } from '../../node_modules/@material-ui/core';
import CameraDialog from "./CameraDialog";
import emitter from "../Utils/EventEmitter";
import TargetDialog from './TargetDialog';
import $ from "jquery";

//const camera = ['camera1', 'camera2','camera3'];
const video = {'camera1':file1, 'camera2':file1, 'camera3':file1};

let canvas,time,x1,y1,x2,y2;

function select(x1,y1,x2,y2){
    let video = document.getElementById("video_id");
    let ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle="#0000ff";
    ctx.lineWidth = 3;
    ctx.rect(x1,y1,x2-x1,y2-y1);
    ctx.stroke();
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
    }
    else{
        let p = getEventPosition(e);
        x2 = p.x;
        y2 = p.y;
        select(x1,y1,x2,y2);
        time = 0;
    }
}

function ifHistory(){
    let url = document.location.toString();
    let arrUrl = url.split("//");
    let splitUrl = arrUrl[1].split("/");
    let relUrl = splitUrl[1];

    if(relUrl.indexOf("?") !== -1){
        relUrl = relUrl.split("?")[0];
    }
    return (relUrl==='history-video');
}

class SelectObject extends React.Component {
    componentDidMount(){
        if(ifHistory()) {
            canvas = document.getElementById('screenShot');
            time = 0;
            window.setTimeout(function () {
                canvas.removeEventListener('click', selectObj, false);
                canvas.addEventListener('click', selectObj, false);
            }, 500);
        }
    }

    render(){
        return(
            <Paper  elevation={1} style={{margin: "1%"}} square='true'>
                <Grid>
                    {ifHistory() && <canvas id="screenShot" width="800" height="600" />}
                    <canvas id = "selectedPart" hidden/>
                </Grid>
            </Paper>
        );
    }
}

export default SelectObject;