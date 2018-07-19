import React from 'react';
import Paper from '@material-ui/core/Paper';
import '../App.css';
import { Grid } from '../../node_modules/@material-ui/core';

class SelectObject extends React.Component {
    render(){
        return(
            <Paper  elevation={1} style={{margin: "1%"}} square='true'>
                <Grid>
                    <canvas id="screenShot" width="800" height="600" hidden/>
                </Grid>
                <Grid>
                    <canvas id = "selectedPart" hidden/>
                </Grid>
            </Paper>
        );
    }
}

export default SelectObject;