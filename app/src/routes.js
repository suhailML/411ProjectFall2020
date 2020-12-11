import React from 'react';
// import { Route } from 'react-router';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";

import App from './App'
import Login from './views/Login'
import Home from './views/Home';



export default(
    <Router>
        <Switch>
            <Route exact path="/"> <Home/> </Route>
            <Route path="/login" component={Login} />
            {/* protected route */}
            <Route path="/home/:userid"> <App/> </Route>
        </Switch>
    </Router>
    
)