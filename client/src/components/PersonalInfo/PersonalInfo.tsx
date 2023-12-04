import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useAppDispatch } from '../../redux/hooks';
import { getMyUsername, setUser } from '../../redux/userSlice';
import { IUser } from '../../types/user';
import DataBox from '../DataBox/DataBox';
import { getUserPlainInfo, handleRelationship } from '../../services/users';

import './PersonalInfo.css';

const PersonalInfo = () => {
  const dispatch = useAppDispatch();
  const { username: currentProfile } = useParams();
  const myUsername = getMyUsername();
  const { user, handleLogout } = useAuth();
  const { _id: myId } = (user as IUser) || {};
  const isMyProfile = currentProfile === myUsername;

  const [isLoading, setIsLoading] = useState(false);
  const [relation, setRelation] = useState('');
  const [info, setInfo] = useState<IUser | null>(null);
  const { username, avatar, description, statistics } = (info as IUser) || {};

  useEffect(() => {
    const getInfo = async () => {
      const info = await getUserPlainInfo(currentProfile as string);
      setInfo(info);

      setIsLoading(false);
      return;
    };

    setIsLoading(true);
    getInfo();
  }, [currentProfile]);

  useEffect(() => {
    if (info) {
      const { followers } = info.statistics;
      const isFollowing = followers.includes(myId);
      setRelation(isFollowing ? 'unfollow' : 'follow');
    }
  }, [info]);

  const handleRelation = async () => {
    try {
      const data = await handleRelationship(
        currentProfile as string,
        myUsername as string,
        relation
      );
      const { receiver, user } = data;
      setInfo(receiver);
      dispatch(setUser(user));

      if (relation === 'follow') {
        setRelation('unfollow');
      } else {
        setRelation('follow');
      }
    } catch (error) {
      console.log('personal info component err -->', error);
    }
  };

  if (isLoading) {
    return <div className="personal-info-loading" />;
  }

  const onLogout = async () => {
    await handleLogout();
  };

  return (
    <>
      {info && (
        <div className="personal-info">
          <div className="upper">
            <div className="avatar">
              <img src={avatar} alt="avatar" />
            </div>
            <div className="statistics">
              {['posts', 'followers', 'following'].map((cat, index) => {
                return (
                  <DataBox
                    key={index}
                    type={cat}
                    number={statistics[cat].length}
                  />
                );
              })}
            </div>
          </div>
          <div className="lower">
            <p className="name">{username}</p>
            <p className="desc">{description}</p>
            {isMyProfile && (
              <>
                <Link to={`/edit-profile/${username}`}>
                  <button className="edit-btn">Edit profile</button>
                </Link>
                <Link to={`/Login`}>
                  <button onClick={() => onLogout()} className="edit-btn">
                    Log out
                  </button>
                </Link>
              </>
            )}
            {!isMyProfile && (
              <button onClick={handleRelation}>{relation}</button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalInfo;
