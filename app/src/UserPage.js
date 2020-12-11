import './styles/App.scss';
import { Link } from 'react-router-dom'
import LatestMovies from './views/LatestMovies';
import Search from './views/Search';
import Sidebar from './component/Sidebar';
import Auth from './component/Auth'
import {useParams} from 'react-router-dom';
import friends from './fakedata/friends';


function UserPage() {
    console.log("HERE");
  const { userid } = useParams();
  var userLocation = "popular in west";
  var userLocationRecc = "recommendations for west";
  return (
    <div className="App">
        {/*todo: hide scroll bar*/}
        <div style={{overflowY: 'scroll', height: "100vh"}}>
        <Search type="search"/>
        <LatestMovies type="personal recommendations"/>
        <LatestMovies type={userLocation} />
        <LatestMovies type={userLocationRecc}/>
        </div>
        <Sidebar name={userid} friends={friends}/>
    </div>
  );
}

export default UserPage;