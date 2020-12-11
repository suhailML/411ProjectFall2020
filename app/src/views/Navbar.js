import React, { useState } from 'react'
import { Link, NavLink, useParams } from 'react-router-dom'


const Navbar = () => {
  const { id } = useParams();
const search = () => <Link to={"/home/" + `${id}` + "/search"}/>
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
            <button id="searchbutton" onClick={search}>Search</button>
            <NavLink className="navbar-item" activeClassName="is-active" to="/home">
              Search button
            </NavLink>

            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/about"
            >
              About
            </NavLink>

            <NavLink
              className="navbar-item"
              activeClassName="is-active"
              to="/profile"
            >
              Profile
            </NavLink>
          </div>
            </div>
            </div>
        </nav>
    )
}

export default Navbar