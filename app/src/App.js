import './styles/App.scss';
import { Link } from 'react-router-dom'
import LatestMovies from './views/LatestMovies';
import Sidebar from './Sidebar';
import Auth from './component/Auth'
import {useParams} from 'react-router-dom';

function App() {
  const { userid } = useParams();
  return (
    <div className="App">
        {/*todo: hide scroll bar*/}
        <div style={{overflowY: 'scroll', height: "100vh"}}>
        <LatestMovies type="trending"/>
        <LatestMovies type="west"/>
        <LatestMovies type="trending"/>
        <LatestMovies type="south"/>
        </div>
        <Sidebar name={userid}/>
    </div>
  );
}

export default Auth(App);
