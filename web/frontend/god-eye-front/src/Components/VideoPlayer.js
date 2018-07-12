import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import file from '../image/1.mp4';
import '../App.css';
import { Grid } from '../../node_modules/@material-ui/core';

const camera = ['camera1', 'camera2','camera3'];
const video = {'camera1':'http://mvpc.eastday.com/vzixun/20171017/20171017115054761305610_1_06400360.mp4',
                'camera2':'http://mvpc.eastday.com/vzixun/20180330/20180330162618207325724_1_06400360.mp4',
                'camera3':file};
const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
};
class SimpleDialog extends React.Component {
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleListItemClick = value => {
        this.props.onClose(value);
    };

    render() {
        const { classes, onClose, selectedValue, ...other } = this.props;

        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">列表</DialogTitle>
                <div>
                    <List>
                        {camera.map(camera => (
                            <ListItem button onClick={() => this.handleListItemClick(camera)} key={camera}>
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={camera} />
                            </ListItem>
                        ))}
                        <ListItem button onClick={() => this.handleListItemClick('增加摄像头')}>
                            <ListItemAvatar>
                                <Avatar>
                                    <AddIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="增加摄像头" />
                        </ListItem>
                    </List>
                </div>
            </Dialog>
        );
    }
}

SimpleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);
class VideoPlayer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            videoLink: 'http://mvpc.eastday.com/vdongman/20180624/20180624143307574331215_1_06400360.mp4',
            catchTime: 0,
            open: false,
            selectedValue: camera[1],
        };
        this.style = {
            height: "100%",
            width: "90%",
            margin: "2%",

        };
    }

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = value => {
        this.setState({ selectedValue: value, open: false});
        document.getElementById("video_id").src = video[value];
    };

    play() {
        //let file = document.getElementById('file').files[0];
        //let url = URL.createObjectURL(file);
        let url = "http://mvpc.eastday.com/vzixun/20180330/20180330162618207325724_1_06400360.mp4";
        console.log(url);
        document.getElementById("video_id").src = url;
    }

    render(){
        return(
        <Paper class="fatherPaper" elevation={1} style={{margin: "1%"}}>
            <Grid container spacing={24}>
                <Grid item xs={4} />
                <Grid item xs={2}>
                    <Button variant="contained"  onClick={this.handleClickOpen}>选择摄像头</Button>
                </Grid>
                <Grid item xs={2} />
                <Grid item xs={1}>
                    <Button variant="contained"  onClick = {() => this.play()}>播放监控</Button>
                </Grid>
                <Grid item xs={4} />
            </Grid>
            <Grid>
                <video id="video_id" style={ this.style } controls="controls" preload={false}>
                    <source src= { this.state['videoLink'] } type="video/mp4" /> 
                    <source src= { this.state['videoLink'] } type="video/ogg" /> 
                    <source src= { this.state['videoLink'] } type="video/webm" />
                    <object data = { this.state['videoLink'] } >
                        <embed src= { this.state['videoLink'] } />
                    </object> 
                    您的环境不支持h5播放器
                </video>
                <div>
                    <Typography variant="subheading">当前摄像头: {this.state.selectedValue}</Typography>
                    <SimpleDialogWrapped
                        selectedValue={this.state.selectedValue}
                        open={this.state.open}
                        onClose={this.handleClose}
                    />
                </div>
            </Grid>
        </Paper>
        );
    }
}

export default VideoPlayer;