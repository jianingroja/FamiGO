import DataBox from '../DataBox/DataBox';

import Logo from '../../assets/logo.png';
import './PersonalInfo.css';

const tempImg = Logo;

const PersonalInfo = () => {
  return (
    <div>
      <div className="personal-info">
        <div className="upper">
          <div className="avatar">
            <img src={tempImg} alt="avatar" />
          </div>
          <div className="statistics">
            <DataBox type="Posts" number={123} />
            <DataBox type="Followers" number={321} />
            <DataBox type="Following" number={123} />
          </div>
        </div>
        <div className="lower">
          <p className="name">Jianing Cerveza</p>
          <div className="desc">
            Here is my great collection with the family
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
