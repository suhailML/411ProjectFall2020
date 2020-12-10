import './styles/App.scss';
import { Link } from 'react-router-dom'
import LatestMovies from './views/LatestMovies';
import Search from './views/Search';
import Sidebar from './component/Sidebar';
import Auth from './component/Auth'
import {useParams} from 'react-router-dom';
import friends from './fakedata/friends';
import BulletinBoard from './views/BulletinBoard';


function App() {
  const { userid } = useParams();
  return (
    <div className="App">
        {/*todo: hide scroll bar*/}
        <div style={{overflowY: 'scroll', height: "100vh"}}>
          <BulletinBoard />
          <Search query="Star Wars"/>
          <LatestMovies type="trending"/>
          <LatestMovies type="east"/>
          <LatestMovies type="central"/>
          <LatestMovies type="west"/>
          <LatestMovies type="south"/>
        </div>
        <Sidebar name={userid} friends={friends}/>
    </div>
  );
}

export default Auth(App);
