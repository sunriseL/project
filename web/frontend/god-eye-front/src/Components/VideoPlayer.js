import React from 'react';
import { Button } from 'antd';
//let url = '../image/1.mp4';

class VideoPlayer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
<<<<<<< HEAD
            videoLink: '../image/1.mp4',
=======
            videoLink: "http://sp.ntaotu.com/localhost-wordpress-phpstudy.mp4",
            catchTime: 0,
>>>>>>> 34398e902ef7e4629b51ed582270daab3f58a53b
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
        console.log('aaa');
        let file = document.getElementById('file').files[0];
        let url = URL.createObjectURL(file);
        console.log(url);
        document.getElementById("video_id").src = url;
    }


    render(){
        return(
<<<<<<< HEAD
            <div>
            <video id="video_id" style={ this.style } controls="controls" preload={false}>
=======
            <video id='video-player' style={ this.style } controls="controls" preload="true">
>>>>>>> 34398e902ef7e4629b51ed582270daab3f58a53b
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