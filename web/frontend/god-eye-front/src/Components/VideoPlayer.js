import React from 'react';
import { Button } from 'antd';
//let url = '../image/1.mp4';

class VideoPlayer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            videoLink: '../image/1.mp4',
            catchTime: 0,
        };

        this.style = {
            height: "100%",
            width: "90%",
            margin: "5%",
            minHeight: "60",
            minWidth: "80",
        };
    }

    play() {
        let file = document.getElementById('file').files[0];
        let url = URL.createObjectURL(file);
        console.log(url);
        document.getElementById("video_id").src = url;
    }

    render(){
        return(
        <div>
            <video id="video_id" style={ this.style } controls="controls" preload={false}>
                <source src= { this.state['videoLink'] } type="video/mp4" /> 
                <source src= { this.state['videoLink'] } type="video/ogg" /> 
                <source src= { this.state['videoLink'] } type="video/webm" />
                <object data = { this.state['videoLink'] } >
                    <embed src= { this.state['videoLink'] } />
                </object> 
                您的环境不支持h5播放器
            </video>
            <input type="file" id="file"/>
            <Button type="primary" onClick = {() => this.play()}>播放监控</Button>
        </div>
        );
    }
}

export default VideoPlayer;