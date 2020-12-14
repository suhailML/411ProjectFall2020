import React, { useState } from 'react';
import { Link, NavLink, useLocation, useParams, useRouteMatch } from 'react-router-dom';


const Navbar = () => {
  const { userid } = useParams();
  const [ isOpen, setOpen ] = useState(false);
  const [ query, setQuery ] = useState('');

  

  return(
      <nav className="nav" role="navigation">
        <div className="container">
        <div className="navbar-brand">
          <a
              role="button"
              className={`navbar-burger burger ${isOpen && "is-active"}`}
              aria-label="menu"
              aria-expanded="false"
              onClick={() => setOpen(!isOpen)}
          >                    
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        
        <div className={`navbar-menu ${isOpen && "is-active"}`}>
          <div className="navbar-start">          
              <input id="inputbox" type="text" placeholder="Search.." name="search" onChange={e => setQuery(e.target.value)}></input>
              <Link to={location => ({...location, pathname: "/home/" + userid + "/search/" + query })} >
                <button id="searchbutton">Search</button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;