import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import './NavBar.css';
import $ from "jquery";

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

class UserMap extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            map_name: "用户地图",
            map_bin: '',
        };
    };

    componentDidMount(){
        let _this = this;
        let if_map_changed = (localStorage.getItem('ifMapChanged') === 'true');
        if(localStorage.getItem('ifDBEmpty')==='true'){
            return;
        }
        if(if_map_changed){
            $.ajax({
                type: "get",
                url: "http://127.0.0.1:8081/get_new_map",
                crossDomain: true,
                success: function (data) {
                    _this.setState({
                        map_name: "用户地图",
                        map_bin: data,
                    });
                    localStorage.setItem('ifMapChanged', 'false');
                    localStorage.setItem('currentMapBin', data);
                    _this.render();
                },
                error : function() {}
            })
        }else{
            _this.setState({
                map_name: "用户地图",
                map_bin: localStorage.getItem('currentMapBin'),
            });
        }
    }

    getBase64(file,cb){
        if(typeof(FileReader) === 'undefined'){
            alert("您的浏览器不支持FileReader,请使用Chrome访问本应用");
            return;
        }

        let reader = new FileReader();
        reader.readAsDataURL(file);

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
            $.ajax({
                type: "post",
                url: "http://127.0.0.1:8081/map/add",
                crossDomain: true,
                data: uploadJSON,
                success: function (data) {
                    localStorage.setItem('ifMapChanged', 'true');
                    alert("地图上传成功");
                },
                error : function() {
                    alert("地图上传失败");
                }
            })
        //     fetch('http://localhost:8081/map/add', {
        //         method: 'POST',
        //         mode: 'cors',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(uploadJSON),
        // })
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

    ifMapLoading(){
        var mapBin = this.state['map_bin'];
        return (mapBin==="");
    }

    render(){
        let mapInstantce = <div style={{height: '90%', width:'90%', margin:'5%'}}>请上传地图</div>
        if(localStorage.getItem('ifDBEmpty')==='true'){
            mapInstantce = <div>Loading</div>
        }
        if(!this.ifMapLoading()){
            mapInstantce = <img
            style={{height: '95%', width:'95%', margin:'2.5%'}}
            src={ this.state['map_bin'] }
            alt='无法显示图片'
            /> 
        }

        return (
            <div>
                <Card style={{margin: "1%"}}>
                    {mapInstantce}
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            { this.state['map_name'] }
                        </Typography>
                    </CardContent>
                </Card>
                {(this.ifSetting() ? <div>
                    <TextField
                        id="mapNameHolder"
                        label="请输入地图名称"
                        placeholder="Placeholder"                        
                        margin="normal"
                    />
                    <input type="file"  id="image"/>
                    <Button variant="contained" small onClick = {() => this.upload()}>上传地图</Button>
                </div> : null)}
                </div>
        );
    }
    
}

export default withStyles(styles)(UserMap);