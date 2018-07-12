import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import UserMap from './UserMap';
import Grid from '@material-ui/core/Grid';

const { Footer } = Layout;
let video,canvas,context;
function getUserMediaToPhoto(constraints,success,error) {
    if(navigator.mediaDevices.getUserMedia){
        //最新标准API
        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    }else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints,success,error);
    }else if(navigator.mozGetUserMedia){
        //firefox浏览器
        navigator.mozGetUserMedia(constraints,success,error);
    }else if(navigator.getUserMedia){
        //旧版API
        navigator.getUserMedia(constraints,success,error);
    }
}

function success(stream){
    //兼容webkit核心浏览器
    var CompatibleURL = window.URL || window.webkitURL;
    //将视频流转化为video的源
    video.src = CompatibleURL.createObjectURL(stream);
    video.play();//播放视频
}

function error(error) {
    console.log('访问用户媒体失败：',error.name,error.message);
}


class CurrentVideo extends React.Component {
    componentDidMount(){
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        context = canvas.getContext('2d');
        if (navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia) {
            getUserMediaToPhoto({video: {width: 480, height: 320}}, success, error);
        } else {
            alert('你的浏览器不支持访问用户媒体设备');
        }
        context.drawImage(video, 0, 0, 480, 320);
    }
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
                    <Grid item xs>
                        <UserMap />
                    </Grid>
                    <Grid item xs>
                        <video id="video" width="640" height="480" autoplay></video>
                        <canvas id="canvas" width="640" height="480"></canvas>
                    </Grid>
                </Grid>
                <Footer style={{ textAlign: 'center' }}>
                    God Eye ©2018 Created by SunriseL Team
                </Footer>
            </Layout>
        );
    }
}

export default CurrentVideo;