import React from 'react';
//import { Dialog, Grid, Typography } from '@material-ui/core/es';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import $ from 'jquery';
import { DialogContent } from '@material-ui/core';

class TargetDialog extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            targetList: [],
        }
    }
    
    getTargetList(){
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:8081/target/get",
            crossDomain: true,
            async:true,
            success: function (data) {
                this.setState({targetList: data});
            },
            error : function(error) {
                console.log(error);
            }
        });
    }

    componentWillMount(){
        this.getTargetList();
    }

    handleSelect = (imgSrc) =>{
        this.props.onClose();
        let picJson = {
            imgStream: imgSrc,
        };
        $.ajax({
            type: 'post',
            url: 'http://127.0.0.1:8081/target/choose',
            crossDomain: true,
            async: true,
            data: picJson,
            success: function(data) {
                this.drawRoute(data);
            },
            error: function (error){
                console.log(error);               
            },
        })
    }

    handleClose = () =>{
        this.props.onClose();
    }

    drawRoute(data){
        // data should be formatted as JSONArray as [{cameraId: , x: , y: , relativeTime: , absoluteTime , }]
        let ctx = document.getElementById('lightCameraCanvas');
        let ctxL = ctx.height;
        let ctxW = ctx.width;
        for(let i=0; i<data.length; i++){
            ctx.arc(i.x * ctxW, i.y * ctxL, 1, 0, 2 * Math.PI);
            ctx();
        }
    }


    render(){
        const { onClose, ...other } = this.props;

        let items = null;
        if(this.state.targetList.length === 0){
            items = <Typography variant='headline' style={{margin: "5%"}}>尚未处理完成，请耐心等待</Typography>;
        }else{
            items = <Grid container spacing={8}>{this.state.targetList.map(i => (
                <Grid item xs onClick={this.handleSelect(i.imgsrc)}><img src={i.imgsrc} alt='无法显示图片' /></Grid>
            ))}</Grid>
        }

        return(
            <Dialog onClose={this.handleClose} {...other}>
                <DialogContent>
                    {items}
                </DialogContent>
            </Dialog>
        )
    }
}

export default TargetDialog;