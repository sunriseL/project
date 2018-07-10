import React from 'react';
import { Layout ,Divider, Breadcrumb } from 'antd';
import Grid from '@material-ui/core/Grid';
import VideoPlayer from './VideoPlayer';
const { Footer } = Layout;


const { Content } = Layout;
class TraceTarget extends React.Component {
    render(){
        return(
            <Layout>
                <Grid container spacing={24}>
                    <Grid item xs={2}>
                        <Breadcrumb>
                            <Breadcrumb.Item>慧眼识踪</Breadcrumb.Item>
                            <Breadcrumb.Item>查看追踪结果</Breadcrumb.Item>
                        </Breadcrumb>
                    </Grid>
                </Grid>
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