import React from 'react';
import {  Modal,Layout, Upload, Icon, Breadcrumb, Row, Col } from 'antd';
import UserMap from './UserMap';

const {  Content } = Layout;

class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
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

    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ fileList }) => this.setState({ fileList })

    render(){
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return(
            <Layout>
                <Layout>
                    <Breadcrumb>
                        <Breadcrumb.Item>慧眼识踪</Breadcrumb.Item>
                        <Breadcrumb.Item>导入地图与摄像头</Breadcrumb.Item>
                    </Breadcrumb>
                </Layout>
                <Content>
                    <Row><Col offset={8}>
                        <div className="div1">
                            <Upload
                                style={{maxWidth:2160, width: '90%', margin: '5%',height: '200%'}}
                                action="//jsonplaceholder.typicode.com/posts/"
                                listType="picture"
                                fileList={this.state.fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                            >
                                {this.state.fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                <img alt="example" style={{ width: '500%' ,height: '500%'}} src={this.state.previewImage} />
                            </Modal>
                        </div>
                    </Col></Row>
                    <UserMap />
                </Content>
            </Layout>
        );
    }
}

export default Settings;