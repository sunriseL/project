import React from 'react';
import { Button } from 'antd';
import { Layout,Menu,Icon,Input } from 'antd';
import { Link,BrowserRouter as Router, Route } from "react-router-dom";
import BarMenu from "./BarMenu";

const { Footer} = Layout;
const Search = Input.Search;

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