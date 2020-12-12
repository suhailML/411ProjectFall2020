import './styles/App.scss';
import { Link } from 'react-router-dom'
import LatestMovies from './views/LatestMovies';
import Search from './views/Search';
import Sidebar from './component/Sidebar';
import Auth from './component/Auth'
import {useParams} from 'react-router-dom';
import friends from './fakedata/friends';
import Login from './component/LoginC';
import Logout from './component/Logout';



function App() {
  const { userid } = useParams();
  return (
    <div className="App">
        {/*todo: hide scroll bar*/}
        <div style={{overflowY: 'scroll', height: "100vh"}}>
        <Search type="search"/>
        <LatestMovies type="trending"/>
        <LatestMovies type="west"/>
        <LatestMovies type="trending"/>
        <LatestMovies type="south"/>
        <Login />
        <Logout />
        </div>
        <Sidebar name={userid} friends={friends}/>
    </div>
  );
}

export default Auth(App);
