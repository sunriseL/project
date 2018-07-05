import React from 'react';
import { Layout ,Divider, Breadcrumb } from 'antd';
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
                    <video id="video" width="400" height="360" controls="controls">
                    <source src="http://mvpc.eastday.com/vtiyu/20170907/20170907095753399577898_1_06400360.mp4" type="video/mp4"/>
                    你的浏览器不支持H5播放器
                </video>
                </Content>
            <Footer style={{ textAlign: 'center' }}>
               God Eye ©2018 Created by SunriseL Team
           </Footer>
           </Layout>
        );
    }
}

export default TraceTarget;