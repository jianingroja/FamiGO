import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';
import PersonalCollection from '../../components/PersonalCollection/PersonalCollection';

import './ProfilePage.css';

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <PersonalInfo />
      <PersonalCollection />
    </div>
  );
};

export default ProfilePage;
