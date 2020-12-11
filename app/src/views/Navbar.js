import React, { useState } from 'react'
import { Link, NavLink, useParams, useRouteMatch } from 'react-router-dom'


const Navbar = () => {
  let match = useRouteMatch();
  const { id } = useParams();
    const [ isOpen, setOpen ] = useState(false)
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

          
            <input id="inputbox" type="text" placeholder="Search.." name="search"> 
            </input>
            <Link to={`${match.path}`+ "/search" + "/chicken"}>
            <button id="searchbutton">Search</button>

            </Link>
          </div>
            </div>
            </div>
        </nav>
    )
}

export default Navbar