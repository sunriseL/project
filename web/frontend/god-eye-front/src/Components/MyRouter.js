import React from 'react';
import Home from './Home.js';
import { Switch } from 'react-router';
import { BrowserRouter as Router, Route } from "react-router-dom";

class MyRouter extends React.Component {
    render(){
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/current-video" component={Home} />
                        <Route exact path="/history-video" component={Home} />
                        <Route exact path="/trace-target"  component={Home } />
                        <Route exact path="/settings"  component={Home } />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default MyRouter;