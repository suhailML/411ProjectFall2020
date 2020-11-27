import './styles/App.scss';
import { Link } from 'react-router-dom'
import LatestMovies from './views/LatestMovies';
import Sidebar from './Sidebar';

function App() {
  return (
    <div className="App">
        <div>
        <LatestMovies />
          Edit <code>src/App.js</code> and save to reload.
          <Link to="/login"> Login button</Link>
        </div>
        <Sidebar />
        
       
    </div>
  );
}

export default App;
