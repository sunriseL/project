import React from 'react';
import {Button} from 'antd';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './NavBar.css';

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

let url='https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=930073930,3424315015&fm=27&gp=0.jpg'

class UserMap extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            map_url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=930073930,3424315015&fm=27&gp=0.jpg',
            map_name: "用户地图",
        }
    };

    upload() {
        let file = document.getElementById('image').files[0];
        let url = URL.createObjectURL(file);
        console.log(url);
        document.getElementById("map_id").image = url;
        this.setState({
            map_url : url
        })
    }

    render(){

        return (
            <div>
                <Card style={{maxWidth:2160, width: '90%', margin: '5%'}}>
                    <CardMedia id="map_id"
                    style={{height: '80%', paddingTop: '56.25%'}}
                    image={ this.state['map_url'] }
                    title={ this.state['map_name'] }
                    />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            { this.state['map_name'] }
                        </Typography>
                    </CardContent>
                </Card>
                <input type="file"  id="image"/>
                <Button type="primary" onClick = {() => this.upload()}>上传地图</Button>
                </div>
        );
    }
    
}

export default withStyles(styles)(UserMap);