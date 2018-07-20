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
import ConfirmDialog from "./ConfirmDialog";

const video = {'camera1':file1, 'camera2':file1, 'camera3':file1};

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
            emitter.emit('lightCamera', value);
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
                    <Grid item xs>
                        <ConfirmDialog />
                    </Grid>
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
            </Grid>
        </Paper>
        );
    }
}

export default VideoPlayer;