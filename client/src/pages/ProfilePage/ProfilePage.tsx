import { useParams } from 'react-router-dom';
import { getMyUsername } from '../../redux/userSlice';
import { ProfileContext } from '../../context/ProfileContext';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';
import PersonalCollection from '../../components/PersonalCollection/PersonalCollection';

import './ProfilePage.css';

const ProfilePage = () => {
  const { username: currentProfile } = useParams();
  const myUsername = getMyUsername();
  const isMyProfile = currentProfile === myUsername;

  return (
    <ProfileContext.Provider
      value={{ isMyProfile, currentProfile: currentProfile as string }}
    >
      <div className="profile-page">
        <PersonalInfo />
        <PersonalCollection />
      </div>
    </ProfileContext.Provider>
  );
};

export default ProfilePage;
