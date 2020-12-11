import './styles/App.scss';
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom'

import LatestMovies from './views/LatestMovies';
import Sidebar from './component/Sidebar';
import Auth from './component/Auth'
import {useParams} from 'react-router-dom';
import friends from './fakedata/friends';
import Navbar from './views/Navbar';
function App() {
  const { userid } = useParams();
  let match = useRouteMatch();
  console.log(match)
  return (
    <div className="App">
      <Navbar/>
        {/*todo: hide scroll bar*/}
        <div style={{overflowY: 'scroll', height: "100vh"}}>
        <Switch>
          <Route exact path={match.path}>
              <LatestMovies type="trending"/>
            <LatestMovies type="west"/>
            <LatestMovies type="trending"/>
            <LatestMovies type="south"/>
          </Route>

          <Route path={`${match.path}/search`}>
            <p> we are searching for things</p>
          </Route>
  

        </Switch>
        
        </div>
        <Sidebar name={userid} friends={friends}/>
    </div>
  );
}

export default Auth(App);
