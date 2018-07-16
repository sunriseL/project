import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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


class UserMap extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            map_name: "用户地图",
            map_bin: localStorage.getItem('currentMapBin'),
        };
    };

    render(){
        let mapInstantce = <div>Loading</div>
        if(!(localStorage.getItem('ifDBEmpty')==='true')){
            mapInstantce = <img id='mapImg'
            style={{height: '80%', width:'95%', margin:'2.5%'}}
            src={ this.state['map_bin'] }
            alt='无法显示图片'
            /> 
        }
    
        return (
                <Card style={{margin: "1%", height:"98%"}} square={true}>
                    {mapInstantce}
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