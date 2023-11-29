import { NavLink } from 'react-router-dom';

import './Nav.css';
import Home from '../../assets/Home.svg';
import Profile from '../../assets/Profile.svg';
import Publish from '../../assets/Publish.svg';
import LightBulb from '../../assets/LightBulb.svg';

const Nav = () => {
  return (
    <div className="nav">
      <div>
        <NavLink to="/">
          <img src={Home} alt="Feed" />
        </NavLink>
      </div>
      <div>
        <NavLink to="/profile">
          <img src={Profile} alt="Profile" />
        </NavLink>
      </div>
      <div>
        <NavLink to="/generator">
          <img src={LightBulb} alt="LightBulb" />
        </NavLink>
      </div>
      <div>
        <NavLink to="/publish-activity">
          <img src={Publish} alt="Publish" />
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
