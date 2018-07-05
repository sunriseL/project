import React from 'react';
import { Layout } from 'antd';
import BarMenu from "./BarMenu";

const { Footer} = Layout;

class Home extends React.Component {
    render(){
        return(
            <Layout>
                <BarMenu/>
                <Footer>powered by sunriseL team</Footer>
            </Layout>
        );
    }
}

export default Home;