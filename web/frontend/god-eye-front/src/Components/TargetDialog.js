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
        let resultList = [];
        $.ajax({
            type: "get",
            url: "http://127.0.0.1:8081/target/get",
            crossDomain: true,
            async:true,
            success: function (data) {
                resultList = data;
                return resultList;
            },
            error : function() {
                alert("请确认网络连接正常");
                return resultList;
            }
        });
    }

    componentWillMount(){
        this.setState({
            targetList: this.getTargetList(),
        })

        console.log(this.state);
    }


    render(){
        let items = null;

        if(this.state.targetList === []){
            items = <Typography variant='display1'>尚未处理完成，请耐心等待</Typography>;
            console.log("true");
        }else{
            items = <Grid container spacing={8}>{this.state.targetList.map(i => (
                <Grid item xs><img src={i} /></Grid>
            ))}</Grid>
        }

        return(
            <Dialog>
                {items}
            </Dialog>
        )
    }
}

export default TargetDialog;