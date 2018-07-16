import React from 'react';
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanelActions } from '../../node_modules/@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';

import emitter from '../Utils/EventEmitter';


class AddCamera extends React.Component {
    state = {
        activeStep: 0,
        px: 0,
        py: 0,
    };    

    cameraStat = {
    
    }


    componentDidMount(){
        this.eventEmitter = emitter.addListener('canvasClick', (position)=>{
            this.setState({
                activeStep: this.state.activeStep,
                px: position.x,
                py: position.y,
            });
            document.getElementById('camera-x').value = position.x*1100;
            document.getElementById('camera-y').value = position.y*750;
        });
    }

    getSteps() {
        return ['选择摄像头位置', '设定摄像头参数', '确认摄像头信息'];
    }
    
    getInstruction(stepIndex) {
        switch (stepIndex) {
        case 0:
            return '请在地图上点击摄像头的位置';
        case 1:
            return '请填写摄像头的各种参数';
        case 2:
            return '请确认摄像头的信息';
        default:
            return 'Uknown stepIndex';
        }
    }
    
    getDetail(stepIndex) {
        switch (stepIndex) {
            case 0:
                return(
                <div>
                    <Typography> x: 
                        <Input
                            defaultValue={this.state.px}
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                            disabled
                            id="camera-x"
                            style={{margin: '5%'}}
                        />
                    </Typography>
                    <Typography> y: 
                        <Input
                            defaultValue={this.state.py}
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                            disabled
                            id="camera-y"
                            style={{margin: '5%'}}
                        />
                    </Typography>
                </div>
                );
            case 1:
            case 2:
            default:
                return 'Unknown stepIndex';
        }
    }
        
    handleNext = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep + 1,
            px: this.state.px,
            py: this.state.py,
        });
    };
        
    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
            px: this.state.px,
            py: this.state.py,
        });
    };

    handleMore = () => {
        this.setState({
            activeStep: 0,
            px: 0,
            py: 0,
        });
    };

    render(){
        const steps = this.getSteps();
        const { activeStep } = this.state;
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
                        <Typography>{this.getInstruction(activeStep)}</Typography>
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