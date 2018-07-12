import React from 'react';
import { Layout, Breadcrumb, Divider } from 'antd';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import VideoPlayer from './VideoPlayer.js';
import UserMap from './UserMap.js';
import WrappedHistoryVideoForm from './HistoryVideoForm.js';

const { Footer } = Layout;

class HistoryVideo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            catchTime: 0,
        };

    }

    getCurrentTime() {
        var player = document.getElementById('video_id');

        console.log(player.currentTime);
    };

    render(){
        return(
            <Layout>
                <Grid container spacing={24}>
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
                            <WrappedHistoryVideoForm />
                            <VideoPlayer />
                            <Divider />
                            <Grid style={{textAlign:'center'}} xs={12}>
                                <Button variant="contained" onClick={this.getCurrentTime} small>选定当前帧</Button>
                            </Grid>
                    </Grid>
                </Grid>
                <Footer style={{ textAlign: 'center' }}>
                    God Eye ©2018 Created by SunriseL Team
                </Footer>
            </Layout>
        );
    }
}

export default HistoryVideo;