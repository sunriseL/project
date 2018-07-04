import React from 'react';
import Home from './Home.js';
import { Switch } from 'react-router';
import { BrowserRouter as Router, Route } from "react-router-dom";
import traceTarget from "./TraceTarget";
import HistoryVideo from "./HistoryVideo";
import Settings from "./Settings";

class MyRouter extends React.Component {
    render(){
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/current-video" component={CurrentVideo} />
                        <Route exact path="/history-video" component={HistoryVideo} />
                        <Route exact path="/trace-target"  component={traceTarget} />
                        <Route exact path="/settings"  component={Settings} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default MyRouter;