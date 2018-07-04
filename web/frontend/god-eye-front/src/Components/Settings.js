import React from 'react';
import { Layout, Upload, Icon, message, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';

const uploadProps = {
    name: 'file',
    multiple: true,
    action: '//jsonplaceholder.typicode.com/posts/',
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

const { Header, Content } = Layout;
const Dragger = Upload.Dragger;

class Settings extends React.Component {

    render(){
        return(
            <Layout>

                <Content>
                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <Icon type="inbox" />
                        </p>
                        <p className="ant-upload-drag-text">上传地图</p>
                        <p className="ant-upload-drag-hint">点击或拖拽上传地图图片</p>
                    </Dragger>
                </Content>
            </Layout>
        );
    }
}

export default Settings;