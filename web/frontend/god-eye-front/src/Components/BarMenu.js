import React from 'react';
import { Card, Col, Row} from 'antd';
import {  Link } from "react-router-dom";


class BarMenu extends React.Component {
    render(){
        return(
            <div>
            <div style={{ background: '#ECECEC', padding: '30px' }} className="homeMenu">
                <Row gutter={32}>
                    <Col span={11}><Link to="/current-video"><Card type="inner"  hoverable={true}>查看当前监控</Card></Link></Col>
                    <Col span={11}><Link to="/history-video"><Card type="inner" hoverable={true}>查看历史监控</Card></Link></Col>
                </Row>
            </div>
            <div style={{ background: '#ECECEC', padding: '30px' }} className="homeMenu">
            <Row gutter={32}>
                    <Col span={11}><Link to="/trace-target"><Card type="inner" hoverable={true}>选取追踪对象</Card></Link></Col>
                    <Col span={11}><Link to="/settings"><Card type="inner" hoverable={true}>导入地图和摄像头</Card></Link></Col>
                </Row>
            </div>
            </div>
        );
    }
}

export default BarMenu;