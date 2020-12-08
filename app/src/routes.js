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
import Navbar from './views/Navbar';
import Home from './views/Home';
import Quiz from './views/Quiz';



export default(
    <Router>
        {/* <Navbar/> */}
        <Switch>
            <Route exact path="/"> <Home/> </Route>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Quiz}></Route>
            {/* protected route */}
            <Route path="/home/:userid"> <App/> </Route>
        </Switch>
    </Router>
    
)