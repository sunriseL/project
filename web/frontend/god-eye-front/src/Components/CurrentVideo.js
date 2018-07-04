import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button, Icon, Row, Col } from 'antd';

const {Header, Content } = Layout;

class CurrentVideo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            videoLink: "https://mvpc.eastday.com/vgaoxiao/20180703/20180703175205896698808_1_06400360.mp4"
        };

    }
    render(){
        return(
            <Layout>
                <Content>
                    <video height="600" width="800" controls="controls" preload="true">
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