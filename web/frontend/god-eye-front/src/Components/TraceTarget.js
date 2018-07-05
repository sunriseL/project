import React from 'react';
import { Layout ,Divider, Breadcrumb } from 'antd';
import VideoPlayer from './VideoPlayer';
const { Footer } = Layout;


const { Content } = Layout;
class TraceTarget extends React.Component {
    render(){
        return(
            <Layout>
                <Layout>
                    <Breadcrumb>
                        <Breadcrumb.Item>慧眼识踪</Breadcrumb.Item>
                        <Breadcrumb.Item>添加地图与摄像头</Breadcrumb.Item>
                    </Breadcrumb>
                </Layout>
                <Content style={{ padding: '0 24px', minHeight: 400 }}>
                    <p>鬼知道怎么追踪，您歇着吧<Divider /></p>
                    <VideoPlayer />
                </Content>
            <Footer style={{ textAlign: 'center' }}>
               God Eye ©2018 Created by SunriseL Team
           </Footer>
           </Layout>
        );
    }
}

export default TraceTarget;