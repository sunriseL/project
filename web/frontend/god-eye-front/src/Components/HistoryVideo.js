import React from 'react';
<<<<<<< HEAD
class HistoryVideo extends React.Component {
=======
import { Row, Col, Layout, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

import WrappedHistoryVideoForm from './HistoryVideoForm.js';

const { Header, Content, Footer, Sider } = Layout;

class CurrentVideo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            videoLink : "https://mvpc.eastday.com/vgaoxiao/20180703/20180703175205896698808_1_06400360.mp4"
        };

    }
    

>>>>>>> fca78443bd9eb7e9990a3cc9a29a1aece4e77204
    render(){
        return(
            <Layout>
                <Header>
                    <Row>
                        <Col span={2}>
                            <Button type="normal">
                                <Link to="/home">
                                    <Icon type="left" />回主页
                                </Link>
                            </Button>
                        </Col>
                    </Row>
                </Header>
                <Content>
                    <WrappedHistoryVideoForm />
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

export default HistoryVideo;