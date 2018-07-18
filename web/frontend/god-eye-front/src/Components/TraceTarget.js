import React from 'react';
import { Breadcrumb } from 'antd';
import Grid from '@material-ui/core/Grid';
import VideoPlayer from './VideoPlayer';
import UserMap from './UserMap';
import { Paper } from '../../node_modules/@material-ui/core';


class TraceTarget extends React.Component {
    render(){
        return(
            <Grid>
                <Grid container spacing={24}>
                    <Grid item xs={2}>
                        <Breadcrumb>
                            <Breadcrumb.Item>慧眼识踪</Breadcrumb.Item>
                            <Breadcrumb.Item>查看追踪结果</Breadcrumb.Item>
                        </Breadcrumb>
                    </Grid>
                </Grid>
                <Grid container xs={12} spacing={8}>
                    <Grid item xs={6}>
                        <UserMap />
                    </Grid>
                    <Grid xs={6} item>
                        <VideoPlayer />
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

export default TraceTarget;