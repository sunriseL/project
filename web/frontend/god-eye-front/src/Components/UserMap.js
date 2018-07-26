import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import "./UserMap.css";
import emitter from "../Utils/EventEmitter";
import $ from 'jquery';

const styles = {
    card: {
        maxWidth: 2160,
        width: '60%',
    },
    media: {
        height: '60%',
        paddingTop: '56.25%', // 16:9
    },
};

let c, ctx;
let cameraPosition=[];

function initCamera() {
    cameraPosition.push({camera: 'camera1', _x: 0.6, _y: 0.4});
    cameraPosition.push({camera: 'camera2', _x: 0.5, _y: 0.7});
    cameraPosition.push({camera: 'camera3', _x: 0.3, _y: 0.3});
}

function lightCamera(cameraValue){
    c = document.getElementById('lightCameraCanvas');
    ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    c.width = document.getElementById('mapImg').width;
    c.height = document.getElementById('mapImg').height;
    c.margin = document.getElementById('mapImg').margin;
    for(let i of cameraPosition){
        if(i.camera === cameraValue){
            let x = i._x * c.width;
            let y = i._y * c.height;
            let grd = ctx.createRadialGradient(x, y, 5, x, y, 20);
            grd.addColorStop(0, "red");
            grd.addColorStop(1, "white");
            ctx.globalAlpha = 0.8;
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(x, y, 15, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
    }
}

function ifTarget(){
    let url = document.location.toString();
    let arrUrl = url.split("//");
    let splitUrl = (arrUrl[1]||"").split("/");
    let relUrl = splitUrl[1];
　　if((relUrl||"").indexOf("?") !== -1){
        relUrl = relUrl.split("?")[0];
　　}
　　return (relUrl==='trace-target');
}

class UserMap extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            map_name: "用户地图",
            map_bin: localStorage.getItem('currentMapBin'),
        };
    };

    componentDidMount(){
        if(ifTarget()){
            return;
        }
        initCamera();
        c = document.getElementById('lightCameraCanvas');
        ctx = c.getContext('2d');
        emitter.removeAllListeners('lightCamera');
        emitter.on('lightCamera', lightCamera);
        lightCamera(localStorage.getItem('selectedCamera'));
        $(window).resize(function() {
           console.log('resize');
           c.width = document.getElementById('mapImg').width;
           c.height = document.getElementById('mapImg').height;
           c.margin = document.getElementById('mapImg').margin;
           lightCamera(localStorage.getItem('selectedCamera'));
        });
    }

    render(){
        let mapInstance = <div>Loading</div>;
        let mapCanvas;
        if(!(localStorage.getItem('ifDBEmpty')==='true')){
            mapInstance = <img id='mapImg'
            style={{height: '80%', width:'95%', margin:'2.5%'}}
            src={ this.state['map_bin'] }
            alt='无法显示图片'
            />;
            mapCanvas = <canvas id="lightCameraCanvas" width={mapInstance.width}
                        height={mapInstance.height} margin={mapInstance.margin} style={{ 
                            position: 'absolute',
                            display:'block',
                            zIndex: 2,
                            left: '2.9%',
                            top: '2.9%',
                            margin: '2.5%'}}/>;
        }
    
        return (
                <Card style={{margin: "1%", height:"98%"}} square={true}>
                    {ifTarget() ? null : mapCanvas}
                    {mapInstance}
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            { this.state['map_name'] }
                        </Typography>
                    </CardContent>
                </Card>
        );
    }
}

export default withStyles(styles)(UserMap);