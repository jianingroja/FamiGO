import { Link, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { IUser } from '../../types/user';
import DataBox from '../DataBox/DataBox';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../../services/users';
import { UserInfo } from '../../types/user';
import { followAndUnfollow } from '../../services/users';
import { getMyUsername } from '../../redux/userSlice';
import { checkFollowing } from '../../services/users';

import './PersonalInfo.css';

const PersonalInfo = () => {
  const { user } = useAuth();
  const { username, avatar, description, statistics } = user as IUser;
  const { username: currentProfile } = useParams();
  const isMyProfile = currentProfile === username;

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  async function checkIfFollows() {
    const following = await checkFollowing(username!, userInfo?.user.username!);
    setIsFollowing(following.following);
  }

  useEffect(() => {
    async function getInfoFromUser() {
      const userData = await getUserInfo(currentProfile!);
      setUserInfo(userData);
    }
    getInfoFromUser();
  }, [currentProfile]);

  useEffect(() => {
    checkIfFollows();
  }, [username, userInfo?.user.username]);

  const follow = async () => {
    console.log('follow');
    const followData = await followAndUnfollow(
      userInfo?.user.username!,
      username!
    );
    console.log(followData);
    checkIfFollows();
  };

  return (
    <div>
      <div className="personal-info">
        <div className="upper">
          <div className="avatar">
            <img src={avatar} alt="avatar" />
          </div>
          <div className="statistics">
            {Object.entries(statistics).map(([key, value]) => (
              <DataBox type={key} number={value.length} />
            ))}
          </div>
        </div>
        <div className="lower">
          <p className="name">{username}</p>
          <p className="desc">{description}</p>
          {isMyProfile && (
            <Link to={`/edit-profile/${username}`}>
              <button className="edit-btn">Edit profile</button>
            </Link>
          )}
          <button onClick={() => follow()}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
