import React from 'react';
import { Layout, Breadcrumb, Row, Col, Button } from 'antd';

import WrappedHistoryVideoForm from './HistoryVideoForm.js';
import VideoPlayer from './VideoPlayer.js';
import UserMap from './UserMap.js';


class HistoryVideo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            videoLink: "https://mvpc.eastday.com/vgaoxiao/20180703/20180703175205896698808_1_06400360.mp4",
            catchTime: 0,
        };

    }

    getCurrentTime() {
        var player = document.getElementById('video-player');

        console.log(player.currentTime);
    };

    render(){
        return(
            <Layout>
                <Layout>
                    <Breadcrumb>
                        <Breadcrumb.Item>慧眼识踪</Breadcrumb.Item>
                        <Breadcrumb.Item>查看历史记录</Breadcrumb.Item>
                    </Breadcrumb>
                </Layout>
                <Row align='top'>
                    <Col span={12}>
                        <UserMap />
                    </Col>
                    <Col span={12}>
                        <Layout>
                            <WrappedHistoryVideoForm />
                            <VideoPlayer />
                            <Button type='primary' onClick={this.getCurrentTime}>选定当前帧</Button>
                        </Layout>
                    </Col>
                </Row>
            </Layout>
        );
    }
}

export default HistoryVideo;