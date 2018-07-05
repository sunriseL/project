import React from 'react';

class VideoPlayer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            videoLink: "http://sp.ntaotu.com/localhost-wordpress-phpstudy.mp4",
        };

        this.style = {
            height: "100%",
            width: "90%",
            margin: "5%",
            minHeight: "60",
            minWidth: "80",
        };
    }

    render(){
        return(
            <video style={ this.style } controls="controls" preload="true">
                <source src= { this.state['videoLink'] } type="video/mp4" /> 
                <source src= { this.state['videoLink'] } type="video/ogg" /> 
                <source src= { this.state['videoLink'] } type="video/webm" />
                <object data = { this.state['videoLink'] } >
                    <embed src= { this.state['videoLink'] } />
                </object> 
                您的环境不支持h5播放器
            </video>
        );
    }
}

export default VideoPlayer;