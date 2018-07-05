import React from 'react';
import { Layout, Breadcrumb, Row, Col } from 'antd';
import UserMap from './UserMap';
import VideoPlayer from './VideoPlayer.js';


class CurrentVideo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            videoLink: "http://mvpc.eastday.com/vtiyu/20170907/20170907095753399577898_1_06400360.mp4"
        };

    }
    render(){
        return(
            <Layout>
                <Layout>
                    <Breadcrumb>
                        <Breadcrumb.Item>慧眼识踪</Breadcrumb.Item>
                        <Breadcrumb.Item>查看当前监控</Breadcrumb.Item>
                    </Breadcrumb>
                </Layout>

                <Layout>
                    <Row>
                        <Col span={ 12 }>
                            <UserMap /> 
                        </Col>
                        <Col span={ 12 }>
                            <VideoPlayer />
                        </Col>
                    </Row>
                </Layout>
            </Layout>
        );
        

    }
}

export default CurrentVideo;