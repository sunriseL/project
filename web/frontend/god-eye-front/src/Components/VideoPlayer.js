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

const video = {'camera1':file1, 'camera2':file1, 'camera3':file1};

let canvas,time,x1,y1,x2,y2,imgUrl;

function generateSelectedImg(){
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

function select(x1,y1,x2,y2){
    let video = document.getElementById("video_id");
    let ctx = canvas.getContext('2d');
    canvas.hidden = false;
    canvas.width = 800;
    canvas.height = 600;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle="#0000ff";
    ctx.lineWidth = 3;
    ctx.rect(x1,y1,x2-x1,y2-y1);
    ctx.stroke();
    let selectedPart = document.getElementById("selectedPart");
    let selectedPartCtx = selectedPart.getContext('2d');
    selectedPart.width = Math.abs(x2-x1);
    selectedPart.height = Math.abs(y2-y1);
    selectedPartCtx.drawImage(canvas,x1,y1,x2-x1,y2-y1,0,0,Math.abs(x2-x1),Math.abs(y2-y1));
    imgUrl = selectedPart.toDataURL('image/png');
    selectedPart.hidden = false;
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
    } else{
        let p = getEventPosition(e);
        x2 = p.x;
        y2 = p.y;
        select(x1,y1,x2,y2);
        time = 0;
    }
}

function screenShot(){
    let video = document.getElementById("video_id");
    let canvas = document.getElementById('screenShot');
    canvas.hidden = false;
    let ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 600;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    let image = canvas.toDataURL('image/png');
    console.log(image);
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
            console.log('error');
            console.log(data);
        }
    })
}

function ifTarget(){
    let url = document.location.toString();
    let arrUrl = url.split("//");
    let splitUrl = arrUrl[1].split("/");
    let relUrl = splitUrl[1];
    if(relUrl.indexOf("?") !== -1){
        relUrl = relUrl.split("?")[0];
    }
    return (relUrl==='trace-target');
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

function getCurrentTime() {
    let player = document.getElementById('video_id');
    console.log(player.currentTime);
    screenShot();
}

class VideoPlayer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            videoLink: file1,
            catchTime: 0,
            cameraOpen: false,
            targetOpen: false,
            selectedValue: localStorage.getItem('selectedCamera'),
        };
        this.style = {
            height: "94%",
            width: "94%",
            margin: "3%",
        };
    }

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

    handleClickOpen = () => {
        this.setState({
            cameraOpen: true,
        });
    };

    handleClose = value => {
        this.setState({ selectedValue: value, cameraOpen: false});
        localStorage.setItem("selectedCamera", value);
        document.getElementById("video_id").src = video[value];
        if(!ifTarget())
            emitter.emit('lightCamera', value, false);
    };

    chooseTarget = () =>{
        this.setState({targetOpen: true});
    };

    targetClose = () =>{
        this.setState({targetOpen: false});
    };
    
    render(){
        return(
        <Paper  elevation={1} style={{margin: "1%"}} square='true'>
            <Grid>
                <video id="video_id" style={ this.style } controls="controls" preload={false}>
                    <source src= { this.state['videoLink'] } type="video/mp4" /> 
                    <source src= { this.state['videoLink'] } type="video/ogg" /> 
                    <source src= { this.state['videoLink'] } type="video/webm" />
                    <object data = { this.state['videoLink'] } >
                        <embed src= { this.state['videoLink'] } />
                    </object> 
                    您的环境不支持h5播放器
                </video>
                <Grid container spacing={24}>
                    <Grid item xs>
                        <Button variant="contained"  onClick={this.handleClickOpen}>选择摄像头</Button>
                    </Grid>
                    <Grid item xs>
                        <Typography variant="subheading">当前摄像头: {this.state.selectedValue}</Typography>
                    </Grid>
                    {ifHistory() && <Grid item xs>
                        <Button variant="contained" color='primary' onClick={getCurrentTime} small>选定当前帧</Button>
                        <Button variant="contained" color='primary' onClick={select} small>放大并框选</Button>
                        <Button variant="contained" color='primary' onClick={generateSelectedImg} small>确定</Button>
                    </Grid>}

                    {ifTarget() && <Grid item xs>
                        <Button variant="contained" color='primary' onClick={this.chooseTarget} small>选定追踪对象</Button>
                    </Grid> }
                </Grid>
                <CameraDialog
                    selectedValue={this.state.selectedValue}
                    open={this.state.cameraOpen}
                    onClose={this.handleClose}
                />
                <TargetDialog 
                    open={this.state.targetOpen} 
                    onClose={this.targetClose}
                />
                {/*{ifHistory() && <canvas id="screenShot" width="800" height="600" hidden/>}*/}
                {/*<canvas id = "selectedPart" hidden/>*/}
            </Grid>
        </Paper>
        );
    }
}

export default VideoPlayer;