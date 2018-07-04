import React from 'react';
import { Layout, Menu, Breadcrumb, Icon,Input,Button} from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;
const Search = Input.Search;



class TraceTarget extends React.Component {
    render(){
        return(
            <Layout>
                <Header className="header">
                    <div className="logo" />
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Layout style={{ padding: '24px 0', background: '#fff' }}>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <video id="video" width="400" height="360" controls="controls">
                                <source src="http://mvpc.eastday.com/vtiyu/20170907/20170907095753399577898_1_06400360.mp4" type="video/mp4"/>
                                你的浏览器不支持H5播放器
                            </video>
                           
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    God Eye ©2018 Created by SunriseL Team
                </Footer>
            </Layout>
        );
    }
}

export default TraceTarget;