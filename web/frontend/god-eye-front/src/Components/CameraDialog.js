import React from 'react';
import {withStyles} from "@material-ui/core/styles/index";
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import blue from '@material-ui/core/colors/blue';
import PropTypes from 'prop-types';
// import '../App.css';

const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
};
const camera = ['camera1', 'camera2','camera3'];

class CameraDialog extends React.Component {
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
                            <ListItem button className="item1" onClick={() => this.handleListItemClick(camera)} key={camera}>
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

CameraDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};

export default withStyles(styles)(CameraDialog);