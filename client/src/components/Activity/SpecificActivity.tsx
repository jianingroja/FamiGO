import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  getActivity,
  saveActivityInProfile,
  saveLike,
} from '../../services/activity';
import { ActivityObject } from '../../types/activity';
import { getUserInfo } from '../../services/users';
import { UserInfo } from '../../types/user';

const SpecificActivity = () => {
  const { id } = useParams();
  const [activityData, setActivityData] = useState<ActivityObject | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    async function getActivityInfo() {
      const activity = await getActivity(id!);
      setActivityData(activity);
    }
    getActivityInfo();
  }, [id]);

  useEffect(() => {
    const username = activityData?.activityInfo.userInfo.username;
    async function getInfoFromUser() {
      const userData = await getUserInfo(username!);
      setUserInfo(userData);
    }
    getInfoFromUser();
  }, [activityData]);

  function saveActivity() {
    const activityID = activityData!.activityInfo._id;
    const username = activityData?.activityInfo.userInfo.username;
    saveActivityInProfile(username!, activityID!);
  }

  function like() {
    const activityID = activityData!.activityInfo._id;
    const username = activityData?.activityInfo.userInfo.username;
    saveLike(username!, activityID!);
  }

  return (
    <div className="feed-item">
      <div className="info">
        <div className="avatar">
          <img src={userInfo?.user.avatar} alt="avatar" />
        </div>
        <p>{activityData?.activityInfo.userInfo.username}</p>
      </div>
      <div className="content">
        <img src={activityData?.activityInfo.image} alt="activity image" />
      </div>
      <div className="status">
        <p>{activityData?.activityInfo.likes.length} likes</p>
        <div className="actions">
          <p>
            <button onClick={() => like()}>like</button>
          </p>
          <p>comment</p>
          <p>
            <button onClick={() => saveActivity()}>save</button>
          </p>
        </div>
      </div>
      <p>{activityData?.activityInfo.description}</p>
      <p>view all comments</p>
    </div>
  );
};

export default SpecificActivity;
