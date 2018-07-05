import React from 'react';
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

class UserMap extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            map_url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=930073930,3424315015&fm=27&gp=0.jpg',
            // Put UserMap Here
            map_name: "用户地图",
        }
    };

    render(){

        return (
            <div>
                <Card style={{maxWidth:2160, width: '90%', margin: '5%'}}>
                    <CardMedia
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

                </div>
        );
    }
    
}

export default withStyles(styles)(UserMap);