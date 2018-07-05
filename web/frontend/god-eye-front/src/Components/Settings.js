import React from 'react';
import {  Modal,Layout, Upload, Icon, message, Breadcrumb } from 'antd';
import UserMap from './UserMap';

const uploadProps = {
    name: 'file',
    multiple: false,
    action: 'localhost:8090',
    onChange(info) {
        const status = info.file.status;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }       
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
}

const {  Content } = Layout;
const Dragger = Upload.Dragger;

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
                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-drag-text">上传地图</p>
                        <p className="ant-upload-drag-hint">点击或拖拽上传地图图片</p>
                    </Dragger>
                    <UserMap />
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
                </Content>
            </Layout>
        );
    }
}

export default Settings;