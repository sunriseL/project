import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import UserMap from './UserMap';
import Grid from '@material-ui/core/Grid';
import CameraDialog from "./CameraDialog";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import "./UserMap.css";
import Paper from "@material-ui/core/es/Paper/Paper";

let video,c,ctx;
let cameraPosition=[];
const camera = ['camera1', 'camera2','camera3'];
const videoList = {'camera1':'http://mvpc.eastday.com/vzixun/20171017/20171017115054761305610_1_06400360.mp4',
    'camera2':'http://mvpc.eastday.com/vzixun/20180330/20180330162618207325724_1_06400360.mp4',
    'camera3':''};

function initCamera() {
    cameraPosition.push({camera:'camera1',_x: 0.6, _y: 0.4});
    cameraPosition.push({camera:'camera2',_x: 0.5, _y: 0.7});
    cameraPosition.push({camera:'camera3',_x: 0.3, _y: 0.3});
}

function drawCamera(cameraValue){
    ctx.clearRect(0, 0, c.width, c.height);
    for (let i of cameraPosition){
        if(i.camera === cameraValue) {
            let x = i._x * c.width;
            let y = i._y * c.height;
            let grd = ctx.createRadialGradient(x, y, 5, x, y, 20);
            grd.addColorStop(0, "red");
            grd.addColorStop(1, "white");
            ctx.globalAlpha = 0.8;
            //var img = svgToImg(document.getElementById('cam-icon-light'));
            //img.onload=function(){ctx.drawImage(img, x, y, 40, 40)};
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(x, y, 15, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

function svgToImg(svgTag){
    var svg_xml = (new XMLSerializer()).serializeToString(svgTag);
    var img = new Image();
    img.src = "data:image/svg+xml;base64," + window.btoa(svg_xml);
    return img;
}

function getEventPosition(ev){
    let x, y;
    if (ev.layerX || ev.layerX === 0) {
        x = ev.layerX;
        y = ev.layerY;
    } else if (ev.offsetX || ev.offsetX === 0) { // Opera
        x = ev.offsetX;
        y = ev.offsetY;
    }
    return {x: x, y: y};
}

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
    constructor(props){
        super(props);
        this.state = {
            open: false,
            selectedValue: camera[1],
        };
    }
    componentDidMount(){
        c = document.getElementById('currentVideoCanvas');
        c.width = document.getElementById('mapImg').width;
        c.height= document.getElementById('mapImg').height;
        ctx = c.getContext('2d');
        var img = new Image();
        img.src = localStorage.getItem('currentMapBin');
        c.addEventListener('click', function(e){
            let p = getEventPosition(e);
            console.log('你点击了', p);
            //drawCamera(p.x, p.y);
        }, false);
        video = document.getElementById('currentVideo');
        if (navigator.mediaDevices.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.getUserMedia) {
            getUserMediaToPhoto({video: {width: 480, height: 320}}, success, error);
        } else {
            alert('你的浏览器不支持访问用户媒体设备');
        }
        initCamera();
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = value => {
        this.setState({ selectedValue: value, open: false});
        document.getElementById("currentVideo").src = videoList[value];
        drawCamera(value);
    };

    render(){
        let mapCanvas =  <canvas id="currentVideoCanvas"></canvas>
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
                        {mapCanvas}
                        <UserMap />
                    </Grid>
                    <Grid item xs>
                        <Paper style={{margin:"1%", height:"98%"}} square={true}>
                            <video id="currentVideo" width="640" height="480" autoplay controls></video>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Button variant="contained"  onClick={this.handleClickOpen}>选择摄像头</Button>
                    <Typography variant="subheading">当前摄像头: {this.state.selectedValue}</Typography>
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