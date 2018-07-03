import React from 'react';
import Home from './Home.js';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

class MyRouter extends React.Component {
    render(){
        return (
            <Router history={ hashHistory }>
                <IndexRoute component={ Home } />
                <Route path="/home" component={ Home } />
                <Route path="/current-vedio" component={ Home } />
                <Route path="/history-vedio" component={ Home } />
                <Route path="/trace-target" component={ Home } />
                <Route path="/settings" component={ Home }/>
            </Router>
        );
    }
}

export default MyRouter;