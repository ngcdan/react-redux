import React from 'react';
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul className="navbar-nav">
        <li className="nav-item active">
          <NavLink className="nav-link" to="/" activeStyle={activeStyle} exact>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={'nav-link'} to="/courses" activeStyle={activeStyle}>Courses</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={'nav-link'} to="/about" activeStyle={activeStyle}>About</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;