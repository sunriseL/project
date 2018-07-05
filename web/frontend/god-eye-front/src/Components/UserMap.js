import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import './NavBar.css';

const styles = {
    card: {
        maxWidth: 2160,
        width: '60%'
    },
    media: {
        height: '60%',
        paddingTop: '56.25%', // 16:9
    },
};

class UserMap extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            map_url:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=930073930,3424315015&fm=27&gp=0.jpg',
            // Put UserMap Here
            map_name: "用户地图",
            previewVisible: false,
            previewImage: '',
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=930073930,3424315015&fm=27&gp=0.jpg',
            }],
        }
    };

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
        return (
            <div>
                <Card style={{maxWidth:2160, width: '90%', margin: '5%'}}>
                    <CardMedia
                    style={{height: '80%', paddingTop: '56.25%'}}
                    image={ this.state['map_url'] }
                    title={ this.state['map_name'] }
                    />
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            { this.state['map_name'] }
                        </Typography>
                    </CardContent>
                </Card>
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
                </div>
        );
    }
    
}

export default withStyles(styles)(UserMap);