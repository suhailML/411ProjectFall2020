import React from 'react';
// import { Route } from 'react-router';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";

import App from './App';
import Home from './views/Home';
import Quiz from './views/Quiz';



export default(
    <Router>
        <Switch>
            <Route exact path="/" component={Home} ></Route>
            <Route path="/signup" component={Quiz}></Route>
            {/* protected route */}
            <Route path="/home/:userid"> <App/> </Route>
        </Switch>
    </Router>
    
)