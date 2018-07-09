import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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
            map_url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=930073930,3424315015&fm=27&gp=0.jpg',
            map_name: "用户地图",
            map_bin: "",
        }
    };

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
        let url = URL.createObjectURL(file);

        this.getBase64(file, (result) => {
            let uploadJSON = {
                'map_name': url,
                'map_bin': result,
            };
            console.log(uploadJSON);
            this.setState(uploadJSON);
            $.ajax({
                type: "post",
                url: "http://127.0.0.1:8081/map/add",
                crossDomain: true,
                data: uploadJSON,
                success: function (data) {
                console.log(data);
            }.bind(this),
                error : function() {}
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

    ifMapExist(){
        var mapBin = this.state['map_bin'];
        return (mapBin!=="");
    }

    render(){

        return (
            <div>
                <Card style={{margin: "1%"}}>
                    {this.ifMapExist() ?
                    <img
                    style={{height: '95%', width:'95%', margin:'2.5%'}}
                    src={ this.state['map_bin'] }
                    alt='无法显示图片'
                    // title={ this.state['map_name'] }
                    /> : 
                    <div style={{height: '90%', width:'90%', margin:'5%'}}>请上传地图</div>
                    }
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            { this.state['map_name'] }
                        </Typography>
                    </CardContent>
                </Card>
                {(this.ifSetting() ? <div>
                    <input type="file"  id="image"/>
                    <Button variant="contained" small onClick = {() => this.upload()}>上传地图</Button>
                </div> : null)}
                </div>
        );
    }
    
}

export default withStyles(styles)(UserMap);