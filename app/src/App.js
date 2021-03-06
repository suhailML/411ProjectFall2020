import './styles/App.scss';
import { Route, Switch, Link, useRouteMatch } from 'react-router-dom';

import LatestMovies from './views/LatestMovies';
import Search from './views/Search';
import Sidebar from './component/Sidebar';
import Auth from './component/Auth';
import {useParams} from 'react-router-dom';
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
        <div style={{overflowY: 'scroll', height: "100%"}}>
        
        <Switch>
          <Route exact path={match.path}>
            <LatestMovies type="global" userid={userid}/>
            <LatestMovies type="west" userid={userid}/>
            <LatestMovies type="east" userid={userid}/>
            <LatestMovies type="south" userid={userid}/>
            <BulletinBoard/>
          </Route>

          {/* the reason why you put component={component} is so that you can
          pass the param info and stuff as part of the props for the search component */}
          <Route path={match.path + "/search/:query"} component={Search}/>
          

        </Switch>
        
        
        </div>
        <Sidebar userID={userid}/>
    </div>
  );
}

export default Auth(App);
