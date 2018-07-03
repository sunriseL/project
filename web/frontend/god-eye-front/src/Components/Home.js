import React from 'react';
import { Button } from 'antd';
import { Layout } from 'antd';
import { Link, Router, hashHistory } from 'react-router';

const {Header, Content, Footer} = Layout;

class Home extends React.Component {
    render(){
        return(
            <Layout>
                <Header>欢迎使用慧眼识踪系统</Header>
                <Content>
                    <Router history={ hashHistory }>
                        <Link to="/current-vedio"><Button>查看实时监控</Button></Link>
                        <Link to="/history-vedio"><Button>调取历史监控</Button></Link>
                        <Link to="/trace-target"><Button>选取追踪对象</Button></Link>
                        <Link to="/settings"><Button>设置</Button></Link>
                    </Router>
                </Content>
                <Footer>powered by sunriseL team</Footer>
            </Layout>
        );
    }
}

export default Home;