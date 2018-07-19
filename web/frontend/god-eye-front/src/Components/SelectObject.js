import React from 'react';
import Paper from '@material-ui/core/Paper';
import '../App.css';
import { Grid } from '../../node_modules/@material-ui/core';

class SelectObject extends React.Component {
    render(){
        return(
            <Grid  container xs={12} spacing={16}>
                <Grid item xs={6} alignItems={"center"}>
                    <canvas id="screenShot" hidden/>
                </Grid>
                <Grid item xs={6} spacing={16}>
                    <canvas id = "selectedPart" hidden/>
                </Grid>
            </Grid>
        );
    }
}

export default SelectObject;