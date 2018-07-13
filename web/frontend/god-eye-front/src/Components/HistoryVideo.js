import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import Grid from '@material-ui/core/Grid';
import VideoPlayer from './VideoPlayer.js';
import UserMap from './UserMap.js';
import WrappedHistoryVideoForm from './HistoryVideoForm.js';
import { Paper } from '../../node_modules/@material-ui/core';



class HistoryVideo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            catchTime: 0,
        };

    }



    render(){
        return(
            <Layout>
                    <Grid container spacing={24} alignItems="stretch">
                        <Grid item xs={2}>
                            <Breadcrumb>
                                <Breadcrumb.Item>慧眼识踪</Breadcrumb.Item>
                                <Breadcrumb.Item>查看历史监控</Breadcrumb.Item>
                            </Breadcrumb>
                        </Grid>
                    </Grid>
                    <Grid container xs={12} spacing={24}>
                        <Grid item xs={6}>
                            <UserMap />
                        </Grid>
                        <Grid xs={6} item>
                            <Paper style={{margin: "1%", height:"10%"}} square={true}>
                                <WrappedHistoryVideoForm />
                            </Paper>
                            <VideoPlayer />
                        </Grid>
                    </Grid>
            </Layout>
        );
    }
}

export default HistoryVideo;