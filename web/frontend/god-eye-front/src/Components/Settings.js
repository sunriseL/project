import React from 'react';
import {  Modal,Layout, Upload, Icon, Breadcrumb, Row, Col } from 'antd';
import UserMap from './UserMap';
import MyUpload from "./Upload";

const {  Content, Footer } = Layout;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

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

    handleChange1 = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }));
        }
    }

    render(){
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return(
            <Layout>
                <Row>
                    <Col span={4}>
                        <Breadcrumb>
                            <Breadcrumb.Item>慧眼识踪</Breadcrumb.Item>
                            <Breadcrumb.Item>添加地图与摄像头</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Content>
<<<<<<< HEAD
                    <UserMap />
                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-drag-text">上传地图</p>
                        <p className="ant-upload-drag-hint">点击或拖拽上传地图图片</p>
                    </Dragger>
                    <MyUpload/>
                    <Upload
                        name="avatar"
                        listType="picture"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="//jsonplaceholder.typicode.com/posts/"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange1}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                    </Upload>
=======
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
>>>>>>> 34398e902ef7e4629b51ed582270daab3f58a53b
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    God Eye ©2018 Created by SunriseL Team
                </Footer>
            </Layout>
        );
    }
}

export default Settings;