import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import file from '../image/1.mp4';
import '../App.css';
import { Grid } from '../../node_modules/@material-ui/core';
import CameraDialog from "./CameraDialog";

const camera = ['camera1', 'camera2','camera3'];
const video = {'camera1':'http://mvpc.eastday.com/vzixun/20171017/20171017115054761305610_1_06400360.mp4',
                'camera2':'http://mvpc.eastday.com/vzixun/20180330/20180330162618207325724_1_06400360.mp4',
                'camera3':file};

class VideoPlayer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            videoLink: 'http://mvpc.eastday.com/vdongman/20180624/20180624143307574331215_1_06400360.mp4',
            catchTime: 0,
            open: false,
            selectedValue: camera[1],
        };
        this.style = {
            height: "100%",
            width: "90%",
            margin: "2%",
        };
    }

    ifHistory(){
        var url = document.location.toString();
        var arrUrl = url.split("//");
        var splitUrl = arrUrl[1].split("/");
        var relUrl = splitUrl[1];//stop省略，截取从start开始到结尾的所有字符

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
        var player = document.getElementById('video_id');
        console.log(player.currentTime);
    };

    handleClose = value => {
        this.setState({ selectedValue: value, open: false});
        document.getElementById("video_id").src = video[value];
    };

    play() {
        let url = "http://mvpc.eastday.com/vzixun/20180330/20180330162618207325724_1_06400360.mp4";
        console.log(url);
        document.getElementById("video_id").src = url;
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