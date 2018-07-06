import React from 'react';
import { Layout, Breadcrumb, Row, Col, Divider } from 'antd';
import Button from '@material-ui/core/Button';

import WrappedHistoryVideoForm from './HistoryVideoForm.js';
import VideoPlayer from './VideoPlayer.js';
import UserMap from './UserMap.js';

const { Footer } = Layout;

class HistoryVideo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            videoLink: "https://mvpc.eastday.com/vgaoxiao/20180703/20180703175205896698808_1_06400360.mp4",
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
                <Row>
                    <Col span={4}>
                        <Breadcrumb>
                            <Breadcrumb.Item>慧眼识踪</Breadcrumb.Item>
                            <Breadcrumb.Item>查看历史监控</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row align='top'>
                    <Col span={12}>
                        <UserMap />
                    </Col>
                    <Col span={12}>
                        <Layout>
                            <WrappedHistoryVideoForm />
                            <VideoPlayer />
                            <Divider />
                            <Button onClick={this.getCurrentTime} style={{width: "60%", minWidth: 70, left: "20%"}}>选定当前帧</Button>
                        </Layout>
                    </Col>
                </Row>
                <Footer style={{ textAlign: 'center' }}>
                    God Eye ©2018 Created by SunriseL Team
                </Footer>
            </Layout>
        );
    }
}

export default HistoryVideo;