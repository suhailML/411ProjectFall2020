import './styles/App.css';
import { Link } from 'react-router-dom'
import LatestMovies from './views/LatestMovies';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LatestMovies />
          Edit <code>src/App.js</code> and save to reload.
          <Link to="/login"> Login button</Link>
      </header>
    </div>
  );
}

export default App;
