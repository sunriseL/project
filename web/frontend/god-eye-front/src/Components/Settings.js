import React from 'react';
import { Layout, Breadcrumb } from 'antd';
import Grid from '@material-ui/core/Grid';
import UserMap from './UserMap';

const {  Content, Footer } = Layout;

class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=930073930,3424315015&fm=27&gp=0.jpg',
            }],
        }
    }

    render(){
        return(
            <Layout>
                <Grid container spacing={24}>
                    <Grid item xs={2}>
                        <Breadcrumb>
                            <Breadcrumb.Item>慧眼识踪</Breadcrumb.Item>
                            <Breadcrumb.Item>添加地图与摄像头</Breadcrumb.Item>
                        </Breadcrumb>
                    </Grid>
                </Grid>
                <Content>
                    <UserMap />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    God Eye ©2018 Created by SunriseL Team
                </Footer>
            </Layout>
        );
    }
}

export default Settings;