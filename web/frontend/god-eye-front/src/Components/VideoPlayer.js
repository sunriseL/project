import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import file1 from '../image/2.mp4';
import '../App.css';
import { Grid } from '../../node_modules/@material-ui/core';
import CameraDialog from "./CameraDialog";
import emitter from "../Utils/EventEmitter";

const camera = ['camera1', 'camera2','camera3'];
const video = {'camera1':file1, 'camera2':file1, 'camera3':file1};

class VideoPlayer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            videoLink: file1,
            catchTime: 0,
            open: false,
            selectedValue: camera[1],
        };
        this.style = {
            height: "100%",
            width: "90%",
            margin: "5%",
        };
    }

    ifHistory(){
        let url = document.location.toString();
        let arrUrl = url.split("//");
        let splitUrl = arrUrl[1].split("/");
        let relUrl = splitUrl[1];//stop省略，截取从start开始到结尾的所有字符

　　　　if(relUrl.indexOf("?") !== -1){
　　　　　　relUrl = relUrl.split("?")[0];
　　　　}
　　　　return (relUrl==='history-video');
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    getCurrentTime() {
        let player = document.getElementById('video_id');
        console.log(player.currentTime);
    };

    handleClose = value => {
        this.setState({ selectedValue: value, open: false});
        localStorage.setItem("selectedCamera", String(value));
        document.getElementById("video_id").src = video[value];
        emitter.emit('lightCamera', value, false);
    };

    render(){
        return(
        <Paper  elevation={1} style={{margin: "1%", height: "86%"}} square='true'>
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
                    {this.ifHistory() && <Grid item xs>
                        <Button variant="contained" color='primary' onClick={this.getCurrentTime} small>选定当前帧</Button>
                    </Grid>}
                </Grid>
                    <CameraDialog
                        selectedValue={this.state.selectedValue}
                        open={this.state.open}
                        onClose={this.handleClose}
                    />
            </Grid>
        </Paper>
        );
    }
}

export default VideoPlayer;