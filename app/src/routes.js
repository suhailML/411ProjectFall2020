import React from 'react';
// import { Route } from 'react-router';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

import App from './App'
import Login from './views/Login'

export default(
    <Router>
        <Route path="/" component={App}/>
        <Route path="/login" component={Login} />
    </Router>
    
)