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

const camera = ['camera1', 'camera2','camera3'];
const video = {'camera1':file1, 'camera2':file1, 'camera3':file1};

function screenShot(){
    let video = document.getElementById("video_id");
    let canvas = document.getElementById('screenShot');
    let ctx = canvas.getContext('2d');
    canvas.width = 480;
    canvas.height = 270;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    let image = canvas.toDataURL('image/png');
    $.ajax({
        type: "post",
        url: "http://192.168.1.147:8000/api/uploadImg",
        crossDomain: true,
        dataType:"json",
        data: {imgStream: image},
        success: function (data) {
            console.log(data);
            alert(data.message);
        },
        error : function(data) {
            console.log(data);
        }
    })
}

function ifTarget(){
    let url = document.location.toString();
    let arrUrl = url.split("//");
    let splitUrl = arrUrl[1].split("/");
    let relUrl = splitUrl[1];//stop省略，截取从start开始到结尾的所有字符
    if(relUrl.indexOf("?") !== -1){
        relUrl = relUrl.split("?")[0];
    }
    return (relUrl==='trace-target');
}

function ifHistory(){
    let url = document.location.toString();
    let arrUrl = url.split("//");
    let splitUrl = arrUrl[1].split("/");
    let relUrl = splitUrl[1];//stop省略，截取从start开始到结尾的所有字符

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
            selectedValue: localStorage.getItem('selectedCamera'),
        };
        this.style = {
            height: "94%",
            width: "94%",
            margin: "3%",
        };
    }

    handleClickOpen = () => {
        this.setState({
            cameraOpen: true,
        });
    };

    getCurrentTime() {
        let player = document.getElementById('video_id');
        console.log(player.currentTime);
        screenShot();
        alert("已截取一帧上传\n请至查看追踪结果界面选取追踪对象");
    };

    handleClose = value => {
        this.setState({ selectedValue: value, open: false});
        localStorage.setItem("selectedCamera", value);
        document.getElementById("video_id").src = video[value];
        if(!ifTarget())
            emitter.emit('lightCamera', value, false);
    };


    chooseTarget(){
        return;
    }
    
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
                {ifHistory() && <canvas id="screenShot" width="640" height="480" hidden></canvas>}
            </Grid>
        </Paper>
        );
    }
}

export default VideoPlayer;