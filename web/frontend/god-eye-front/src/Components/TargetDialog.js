import React from 'react';
import { Dialog, Grid, Typography } from '../../node_modules/@material-ui/core/es';
import $ from 'jquery';

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

    handleSelect = () =>{
        this.props.onClose();
    }

    handleClose = () =>{
        this.props.onClose();
    }


    render(){
        const { onClose, ...other } = this.props;

        let items = null;
        if(this.state.targetList.length === 0){
            items = <Typography variant='display1' style={{margin: "5%"}}>尚未处理完成，请耐心等待</Typography>;
        }else{
            items = <Grid container spacing={8}>{this.state.targetList.map(i => (
                <Grid item xs onClick={this.handleSelect}><img src={i.imgsrc} alt='无法显示图片' /></Grid>
            ))}</Grid>
        }

        return(
            <Dialog onClose={this.handleClose} {...other}>
                {items}
            </Dialog>
        )
    }
}

export default TargetDialog;