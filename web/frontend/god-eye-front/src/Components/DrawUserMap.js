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

function select(){
    document.getElementById('map-path').value = document.getElementById('image').value;
}

function drawCycle(){
    var c=document.getElementById("canvas");
    var ctx = c.getContext('2d');
    ctx.beginPath();
    ctx.arc(150,75,10,0,2*Math.PI);
    ctx.fillStyle="red";
    ctx.fill();
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
        let c = document.getElementById('canvas');
        c.width = 1100;
        c.height= 750;
        let ctx = c.getContext('2d');
        let img = new Image();
        img.src = this.state['map_bin'];
        img.onload=function(){ctx.drawImage(img,0,0,c.width,c.height)};
    }

    getBase64(file,cb){
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
        }

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
            let _this=this;
            $.ajax({
                type: "post",
                url: "http://127.0.0.1:8081/map/add",
                crossDomain: true,
                data: uploadJSON,
                success: function (data) {
                    alert("地图上传成功");
                    _this.render();
                },
                error : function() {
                    alert("地图名重复，请使用其它地图名");
                }
            })
        });
        this.render();
    }

    ifSetting(){
        var url = document.location.toString();
        var arrUrl = url.split("//");
        var splitUrl = arrUrl[1].split("/");
        var relUrl = splitUrl[1];//stop省略，截取从start开始到结尾的所有字符

        if(relUrl.indexOf("?") !== -1){
            relUrl = relUrl.split("?")[0];
        }
        return (relUrl==='settings');

    }

    render(){
        let mapInstantce = <div>Loading</div>

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
                    <Button onClick={()=>drawCycle()}/>
                </CardContent>
                {(this.ifSetting() &&
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
                    </Grid>)}
            </Card>
        );
    }
}

export default withStyles(styles)(DrawUserMap);