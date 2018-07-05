import React from 'react';
import { Layout, Breadcrumb, Row, Col } from 'antd';
import UserMap from './UserMap';
import VideoPlayer from './VideoPlayer.js';

const { Footer } = Layout;

class CurrentVideo extends React.Component {
    render(){
        return(
            <Layout>
                <Row>
                    <Col span={4}>
                        <Breadcrumb>
                            <Breadcrumb.Item>慧眼识踪</Breadcrumb.Item>
                            <Breadcrumb.Item>查看当前监控</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
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

                <Footer style={{ textAlign: 'center' }}>
                    God Eye ©2018 Created by SunriseL Team
                </Footer>
            </Layout>
        );
        

    }
}

export default CurrentVideo;