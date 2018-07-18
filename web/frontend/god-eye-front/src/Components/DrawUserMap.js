import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import '../App.css';
import $ from "jquery";
import { Grid, Input } from '../../node_modules/@material-ui/core';
import './UserMap.css';
import emitter from '../Utils/EventEmitter';

const styles = {
    card: {
        maxWidth: 2160,
        width: '60%'
    },
    media: {
        height: '60%',
        paddingTop: '56.25%', // 16:9
    },
};

let c,ctx,img;
function select(){
    document.getElementById('map-path').value = document.getElementById('image').value;
}

function svgToImg(svgTag){
    let svg_xml = (new XMLSerializer()).serializeToString(svgTag);
    let img = new Image();
    img.src = "data:image/svg+xml;base64," + window.btoa(svg_xml);
    return img;
}

function drawCamera(x, y){
    clearCanvas();
    x *= c.width;
    y *= c.height;
    let svg = svgToImg(document.getElementById('cam-icon'));
    svg.onload = function(){ ctx.drawImage(svg, x-25, y-25, 50, 50) };
}

function drawAlpha(x,y,alpha){
    clearCanvas();
    ctx.beginPath();
    drawCamera(x, y);
    x *= c.width;
    y *= c.height;
    ctx.moveTo (x, y);
    ctx.lineTo (x + 200*(Math.cos(alpha)), y + 200*Math.sin(alpha));
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#14a8f0";
    ctx.stroke();
}

function clearCanvas () {
    c = document.getElementById('canvas');
    ctx = c.getContext('2d');
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
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

function clickCanvas(e){
    let p = getEventPosition(e);
    emitter.emit('canvasClick', {
        x: p.x/1100,
        y: p.y/750,
    });
}

function initEmitter(){
    c.removeEventListener('click', clickCanvas, false);
    c.addEventListener('click', clickCanvas, false);
    emitter.removeAllListeners('drawCamera');
    emitter.removeAllListeners('drawAlpha');
    emitter.on('drawCamera', drawCamera);
    emitter.on('drawAlpha', drawAlpha);
}

class DrawUserMap extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            map_name: "用户地图",
            map_bin: localStorage.getItem('currentMapBin'),
        };
    };

    componentDidMount(){
        c = document.getElementById('canvas');
        c.width = 1100;
        c.height = 750;
        ctx = c.getContext('2d');
        img = new Image();
        img.src = this.state['map_bin'];
        img.onload = function(){ ctx.drawImage(img, 0, 0, c.width, c.height) };
        initEmitter();
    }

    componentWillUpdate(){
        img.src = this.state['map_bin'];
        img.onload=function(){ctx.drawImage(img, 0, 0, c.width, c.height)};
    }

    getBase64(file, cb){
        if(typeof(FileReader) === 'undefined'){
            alert("您的浏览器不支持FileReader,请使用Chrome访问本应用");
            return;
        }

        let reader = new FileReader();
        try{
            reader.readAsDataURL(file);
        }catch(e){
            alert("请选择图片");
            return;
        }
        reader.onload = function(){
            cb(reader.result);
        };
        reader.onerror = function(error){
            console.log('Error: ', error);
        }
    }

    upload() {
        let file = document.getElementById('image').files[0];
        this.getBase64(file, (result) => {
            let map_name = document.getElementById('mapNameHolder').value;
            let uploadJSON = {
                'map_bin': result,
                'map_name': map_name,
            };
            this.setState(uploadJSON);
            localStorage.setItem('currentMapBin',result);
            let _this = this;
            $.ajax({
                type: "post",
                url: "http://127.0.0.1:8081/map/add",
                crossDomain: true,
                data: uploadJSON,
                async:true,
                success: function (data) {
                    alert("地图上传成功");
                    _this.setState(uploadJSON);
                },
                error : function() {
                    alert("上传失败\n请确认网络连接正常\n请确认地图名是否重复");
                    _this.setState(uploadJSON);
                }
            })
        });
        this.render();
    }

    render(){
        let mapInstantce = <div>Loading</div>;

        if(!(localStorage.getItem('ifDBEmpty')==='true')){
            mapInstantce = <canvas id="canvas" ></canvas>
        }

        return (
            <Card style={{margin: "1%", height:"99%"}} square={true}>
                {mapInstantce}
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        { this.state['map_name'] }
                    </Typography>
                </CardContent>
                <Grid container>
                    <Grid item xs={2} />
                    <Grid item xs={2} style={{position: 'relative'}}>
                        <TextField
                                id="mapNameHolder"
                                label="地图名"
                                placeholder="请输入地图名称"
                                margin="normal"
                        />
                    </Grid>
                    <Grid id="control-grid" item xs={2} className="control-grid">
                        <input type="file"  id="image" onChange={() => select()} />
                        <Button variant="contained" color="primary" >选择文件</Button>
                    </Grid>
                    <Grid item xs={2}>
                        <Input style={{top:'25%'}} id="map-path" value="文件路径" disabled/>
                    </Grid>
                    <Grid item xs={2} className='control-grid' style={{position:'relative'}}>
                        <Button variant="contained" color="primary" onClick = {() => this.upload()}>上传地图</Button>
                    </Grid>
                </Grid>
            </Card>
        );
    }
}

export default withStyles(styles)(DrawUserMap);