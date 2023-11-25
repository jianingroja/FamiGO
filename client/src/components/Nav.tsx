import { NavLink } from 'react-router-dom';

import '../styles/Nav.css';

const Nav = () => {
  return (
    <div className="nav">
      <div className="nav-item">
        <NavLink to="/">Feed</NavLink>
      </div>
      <div className="nav-item">
        <NavLink to="/profile">Profile</NavLink>
      </div>
      <div className="nav-item">
        <NavLink to="/generator">Generator</NavLink>
      </div>
      <div className="nav-item">
        <NavLink to="/publish-idea">Publish</NavLink>
      </div>
    </div>
  );
};

export default Nav;
