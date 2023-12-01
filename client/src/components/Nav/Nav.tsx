import { NavLink } from 'react-router-dom';
import { getMyUsername } from '../../redux/userSlice';

import './Nav.css';
import Home from '../../assets/Home.svg';
import Profile from '../../assets/Profile.svg';
import Publish from '../../assets/Publish.svg';
import LightBulb from '../../assets/LightBulb.svg';

const Nav = () => {
  const username = getMyUsername();

  return (
    <div className="nav">
      <NavLink to="/feed">
        <img src={Home} alt="Feed" />
      </NavLink>
      <NavLink to={`/profile/${username}`}>
        <img src={Profile} alt="Profile" />
      </NavLink>
      <NavLink to="/generator">
        <img src={LightBulb} alt="LightBulb" />
      </NavLink>
      <NavLink to="/publish-activity">
        <img src={Publish} alt="Publish" />
      </NavLink>
    </div>
  );
};

export default Nav;
