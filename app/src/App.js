import './styles/App.scss';
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom'

import LatestMovies from './views/LatestMovies';
import Search from './views/Search';
import Sidebar from './component/Sidebar';
import Auth from './component/Auth'
import {useParams} from 'react-router-dom';
import friends from './fakedata/friends';
import Navbar from './views/Navbar';
import BulletinBoard from './views/BulletinBoard';


function App() {
  const { userid } = useParams();
  let match = useRouteMatch();
  console.log(userid)
  return (
    <div className="App">
      <Navbar/>

        {/*todo: hide scroll bar*/}
        <div style={{overflowY: 'scroll'}}>
        
        <Switch>
          <Route exact path={match.path}>
          <BulletinBoard/>
              <LatestMovies type="trending"/>
            <LatestMovies type="west"/>
            <LatestMovies type="trending"/>
            <LatestMovies type="south"/>
          </Route>

          {/* the reason why you put component={component} is so that you can
          pass the param info and stuff as part of the props for the search component */}
          <Route path={match.path + "/search/:query"} component={Search}/>
      

        </Switch>
        
        
        </div>
        <Sidebar name={userid} friends={friends}/>
    </div>
  );
}

export default Auth(App);
