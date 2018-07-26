import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import UserMap from './UserMap';
import Grid from '@material-ui/core/Grid';
import CameraDialog from "./CameraDialog";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from "@material-ui/core/Paper";
import file1 from '../image/2.mp4';
import emitter from "../Utils/EventEmitter";

let video;
const videoList = {'camera1':file1, 'camera2':file1, 'camera3':file1};
//const videoList = {'camera1':'', 'camera2':'', 'camera3':''};

function getUserMedia(constraints,success,error) {
    if(navigator.mediaDevices.getUserMedia){
        //newestAPI
        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    }else if (navigator.webkitGetUserMedia) {
        //webkit
        navigator.webkitGetUserMedia(constraints,success,error);
    }else if(navigator.mozGetUserMedia){
        //firefox
        navigator.mozGetUserMedia(constraints,success,error);
    }else if(navigator.getUserMedia){
        //old version API
        navigator.getUserMedia(constraints,success,error);
    }
}

function success(stream){
    let CompatibleURL = window.URL || window.webkitURL;
    video.src = CompatibleURL.createObjectURL(stream);
    video.play();
}

function error(error) {
    console.log('访问用户媒体失败：',error.name,error.message);
}


class CurrentVideo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            selectedValue: localStorage.getItem('selectedCamera'),
        };
    }

    componentDidMount(){
        video = document.getElementById('currentVideo');
        if (navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia) {
            getUserMedia({video: {width: 480, height: 320}}, success, error);
        } else {
            alert('你的浏览器不支持访问用户媒体设备');
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = value => {
        this.setState({ selectedValue: value, open: false});
        document.getElementById("currentVideo").src = videoList[value];
        localStorage.setItem('selectedCamera',value);
        emitter.emit('lightCamera', value, false);
    };

    render(){
        return(
            <Layout>
                <Grid container spacing={24}>
                    <Grid item xs={2}>
                        <Breadcrumb>
                            <Breadcrumb.Item>慧眼识踪</Breadcrumb.Item>
                            <Breadcrumb.Item>查看当前监控</Breadcrumb.Item>
                        </Breadcrumb>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs style={{position:'relative'}}>
                        <UserMap />
                    </Grid>
                    <Grid item xs>
                        <Paper style={{margin:"1%", height:"98%"}} square={true}>
                            <video id="currentVideo" width="640" height="480" autoplay controls></video>
                        <Grid container spacing={24}>
                            <Grid item xs>
                                <Button variant="contained"  onClick={this.handleClickOpen}>选择摄像头</Button></Grid>
                            <Grid item xs>
                                <Typography variant="subheading">当前摄像头: {this.state.selectedValue}</Typography></Grid>
                        </Grid>
                        </Paper>
                    </Grid>
                </Grid>
                <CameraDialog
                    selectedValue={this.state.selectedValue}
                    open={this.state.open}
                    onClose={this.handleClose}
                />
            </Layout>
        );
    }
}

export default CurrentVideo;