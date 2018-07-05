import React from 'react';
import { Button } from 'antd';


class MyUpload extends React.Component {
    play() {
        let file = document.getElementById('image').files[0];
        let url = URL.createObjectURL(file);
        console.log(url);
        document.getElementById("img_id").src = url;
        document.getElementById("map_id").image = url;
        console.log( document.getElementById("map_id").image );
    }

    render() {
        return (
            <div>
            <img id="img_id"/>
            <input type="file"  id="image"/>
                <Button type="primary" onClick = {() => this.play()}>上传地图</Button>
            </div>
                );
    }
}
export default MyUpload;
