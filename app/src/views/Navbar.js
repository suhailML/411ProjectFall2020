import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
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
                    hi
                    
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
                </div>
                <div className={`navbar-menu ${isOpen && "is-active"}`}>
          <div className="navbar-start">
            <NavLink className="navbar-item" activeClassName="is-active" to="/">
              Home
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