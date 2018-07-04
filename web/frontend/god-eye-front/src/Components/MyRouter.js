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
                        <Route exact path="/current-video" component={currentVideo} />
                        <Route exact path="/history-video" component={historyVideo} />
                        <Route exact path="/trace-target"  component={traceTarget} />
                        <Route exact path="/settings"  component={Settings} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default MyRouter;