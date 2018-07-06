import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import UserMap from './UserMap';
import VideoPlayer from './VideoPlayer.js';
import Grid from '@material-ui/core/Grid';

const { Footer } = Layout;

class CurrentVideo extends React.Component {
    render(){
        return(
            <Layout>
                <Grid container spacing={24}>
                    <Grid item xs={2}>
                        <Breadcrumb>
                            <Breadcrumb.Item>慧眼识踪</Breadcrumb.Item>
                            <Breadcrumb.Item>查看当前监控</Breadcrumb.Item>
                        </Breadcrumb>
                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs>
                            <UserMap /> 
                    </Grid>
                    <Grid item xs>
                            <VideoPlayer />
                    </Grid>
                </Grid>

                <Footer style={{ textAlign: 'center' }}>
                    God Eye ©2018 Created by SunriseL Team
                </Footer>
            </Layout>
        );
        

    }
}

export default CurrentVideo;