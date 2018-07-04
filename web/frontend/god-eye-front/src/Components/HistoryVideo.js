import React from 'react';
import { Layout } from 'antd';

import WrappedHistoryVideoForm from './HistoryVideoForm.js';

const { Content } = Layout;

class HistoryVideo extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            videoLink : "https://mvpc.eastday.com/vgaoxiao/20180703/20180703175205896698808_1_06400360.mp4"
        };

    }

    render(){
        return(
            <Layout>
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