import React from 'react';
import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;

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
                        <Breadcrumb.Item>添加地图与摄像头</Breadcrumb.Item>
                    </Breadcrumb>
                </Layout>
                <Content>
                    <video height="600" width="800" controls="controls" preload={true}>
                        <source src= { this.state['videoLink'] } type="video/mp4" />
                        <source src= { this.state['videoLink'] } type="video/ogg" /> 
                        <source src= { this.state['videoLink'] } type="video/webm" />
                        <object data = { this.state['videoLink'] } >
                            <embed src= { this.state['videoLink'] } />
                        </object> 
                        您的环境不支持h5播放器
                    </video>
                </Content>
            </Layout>
        );
        

    }
}

export default CurrentVideo;