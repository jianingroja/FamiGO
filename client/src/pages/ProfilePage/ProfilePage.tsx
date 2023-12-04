import { useParams } from 'react-router-dom';
import { getMyUsername } from '../../redux/userSlice';

import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';
import PersonalCollection from '../../components/PersonalCollection/PersonalCollection';

import './ProfilePage.css';

const ProfilePage = () => {
  const { username: currentProfile } = useParams();
  const myUsername = getMyUsername();
  const isMyProfile = currentProfile === myUsername;

  return (
    <div className="profile-page">
      <PersonalInfo
        isMyProfile={isMyProfile}
        currentProfile={currentProfile as string}
      />
      <PersonalCollection
        isMyProfile={isMyProfile}
        currentProfile={currentProfile as string}
      />
    </div>
  );
};

export default ProfilePage;
