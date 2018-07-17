import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions, Divider, Grid } from '../../node_modules/@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import $ from 'jquery';
import emitter from '../Utils/EventEmitter';

let active;
class AddCamera extends React.Component {
    state = {
        activeStep: 0,
    };    

    cameraStat = {
        x: 0,
        y: 0,
        height: 0,
        alpha: 0,
        beta: 0,
    // alpha is the horizontal angle of the camera, beta is the vertical one
    // these parameters are independent of hardware, they are detemined by setting up
    };

    setEmitter(){
        emitter.removeAllListeners('canvasClick');
        emitter.on('canvasClick', (position)=>{
            this.messageHandler(this.state.activeStep, position);
        });
    }

    messageHandler(stepIndex, message){
        switch(stepIndex) {
            case 0:
                document.getElementById('camera-x').value = message.x * 1100;
                document.getElementById('camera-y').value = message.y * 750;
                this.cameraStat.x = message.x;
                this.cameraStat.y = message.y;
                emitter.emit('drawCamera',
                    {x:this.cameraStat.x, y:this.cameraStat.y}, false);
                return;
            case 1:
                let relX = (message.x - this.cameraStat.x) * 1100;
                let relY = (message.y - this.cameraStat.y) * 750;
                this.cameraStat.alpha = Math.atan(relY / relX) + (relX > 0 ? 0 : 1) * Math.PI;
                this.cameraStat.beta = Math.atan(Math.sqrt(Math.pow(relX, 2) + Math.pow(relY, 2)) / this.cameraStat.height);
                document.getElementById('camera-beta').value = this.cameraStat.beta / Math.PI * 180;
                document.getElementById('camera-alpha').value = this.cameraStat.alpha / Math.PI * 180;
                emitter.emit('drawAlpha',
                    {x:this.cameraStat.x, y:this.cameraStat.y, alpha:this.cameraStat.alpha}, false);
                return;
            case 2:
                return;
            default:
                return;
        }
    }
    
    getSteps() {
        return ['选择摄像头位置', '设定摄像头参数', '确认摄像头信息'];
    }
    
    handleNext = () => {
        const { activeStep } = this.state;
        switch(activeStep){
            case 0:
                this.cameraStat.height = document.getElementById('camera-h').value;
                break;
            case 1:
                break;
            case 2:
                $.ajax({
                    type: "post",
                    url: "http://127.0.0.1:8081/camera/add",
                    crossDomain: true,
                    data: this.cameraStat,
                    async:true,
                    success: function () {
                        alert("摄像头设置成功");
                    },
                    error : function() {
                        alert("上传失败\n请确认网络连接正常");
                    }
                });
                break;
            default:break;
        }
        this.setState({
            activeStep: activeStep + 1,
        });
    };
        
    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleMore = () => {
        this.setState({
            activeStep: 0,
        });
        this.cameraStat = {
            x: 0,
            y: 0,
            height: 0,
            alpha: 0,
            beta: 0,
        }
    };

    getInstruction(stepIndex) {
        switch (stepIndex) {
        case 0:
            return '请在地图上点击摄像头的位置，并输入高度';
        case 1:
            return '请在地图上点击摄像头画面中心点在地图上的位置';
        case 2:
            return '请确认摄像头的信息';
        default:
            return;
        }
    }
    
    getDetail(stepIndex) {
        switch (stepIndex) {
            case 0:
                return(
                <Grid container>
                    <Grid item xs>
                        <Typography variant='body2'> X: 
                            <Input
                                defaultValue={this.cameraStat.x}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                                id="camera-x"
                                style={{margin: '5%'}}
                            />
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant='body2'> Y: 
                            <Input
                                defaultValue={this.cameraStat.y}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                                id="camera-y"
                                style={{margin: '5%'}}
                            />
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography variant='body2'> 高度: 
                            <Input
                                defaultValue={this.cameraStat.height}
                                inputProps={{
                                    'aria-label': 'Description',
                                }}
                                id="camera-h"
                                style={{margin: '5%'}}
                            />
                        </Typography>
                    </Grid>
                </Grid>
                );
            case 1:
                return(
                    <Grid container>
                        <Grid item xs>
                            <Typography variant='body2'>俯角： 
                                <Input
                                    defaultValue={this.cameraStat.beta / Math.PI * 180}
                                    inputProps={{
                                        'aria-label': 'Description',
                                    }}
                                    style={{margin: '5%'}}
                                    id='camera-beta'
                                />
                            </Typography>
                        </Grid>
                        <Grid item xs>
                            <Typography variant='body2'>方位角：
                                <Input
                                    defaultValue={this.cameraStat.alpha / Math.PI * 180}
                                    inputProps={{
                                        'aria-label': 'Description',
                                    }}
                                    style={{margin: '5%'}}
                                    id='camera-alpha'
                                />
                            </Typography>
                        </Grid>
                    </Grid>
                );
            case 2:
                return(
                    <Grid container row alignItems='center' alignContent='center' spacing={24}>
                        <Grid xs={2} />
                        <Grid item column spacing={8} xs>
                            <Grid item xs><Typography variant='display1' align='left'> X: {Math.round(this.cameraStat.x * 1100)} </Typography></Grid>
                            <Grid item xs><Typography variant='display1' align='left'> Y: {Math.round(this.cameraStat.y * 750)} </Typography></Grid>
                            <Grid item xs><Typography variant='display1' align='left'> 高度: {this.cameraStat.height} </Typography></Grid>
                        </Grid> 
                        <Grid item column spacing={8} xs>
                            <Grid item xs><Typography variant='display1' align='left'> 俯角: {Math.round(this.cameraStat.beta / Math.PI * 180)} </Typography></Grid>
                            <Grid item xs><Typography variant='display1' align='left'> 方位角: {Math.round(this.cameraStat.alpha / Math.PI * 180)} </Typography></Grid>
                        </Grid> 
                    </Grid>
                );
            default:
                return;
        }
    }

    render(){
        const steps = this.getSteps();
        const { activeStep } = this.state;
        this.setEmitter();
        return (
            <ExpansionPanel style={{marginLeft: '1%', marginRight:'1%'}}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>添加摄像头</ExpansionPanelSummary>
                <ExpansionPanelDetails align="center">
                    <div style={{marginLeft: '10%', width: "80%"}}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map(label => {
                                return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {this.getDetail(activeStep)}
                        <Divider />
                        <Typography variant='subheading'>{this.getInstruction(activeStep)}</Typography>
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                    {this.state.activeStep !== steps.length && 
                        <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        >
                            上一步
                        </Button>
                    }
                    {this.state.activeStep === steps.length ? (
                        <Button onClick={this.handleMore}>添加更多...</Button>
                    ) : ( 
                        <Button color="primary" onClick={this.handleNext}>
                                {activeStep === steps.length - 1 ? '完成' : '下一步'}
                        </Button>
                    )}
                </ExpansionPanelActions>
            </ExpansionPanel>
        );
    }
}

export default AddCamera;