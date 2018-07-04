import React from 'react';
import { Layout, Row, Col, Button, Divider, Icon } from 'antd';
import { Link } from 'react-router-dom';

const { Header, Content } = Layout;
class traceTarget extends React.Component {
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
                <Content><p>鬼知道怎么追踪，您歇着吧<Divider /></p></Content>
           </Layout>
        );
    }
}

export default traceTarget;