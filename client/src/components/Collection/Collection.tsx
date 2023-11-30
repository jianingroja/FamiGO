import './Collection.css';
import { UserInfo } from '../../types/user';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../../services/users';
import { getActivity } from '../../services/activity';

import Logo from '../../assets/logo.png';
import { act } from 'react-dom/test-utils';

type Props = {
  type: string;
};

const Collection = ({ type }: Props) => {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [userSavedAIPosts, setuserSavedAIPosts] =
    useState<Array<Object> | null>(null);
  const [userSavedPosts, setuserSavedPosts] = useState<Array<Object> | null>(
    null
  );

  useEffect(() => {
    async function getInfoFromUser() {
      const userData = await getUserInfo(username!);
      setUserInfo(userData);

      const savedAIPosts = userData.savedAIActivities;
      setuserSavedAIPosts(savedAIPosts);

      const savedPosts = userData.savedActivities;
      setuserSavedPosts(savedPosts);
    }
    getInfoFromUser();
  }, [username]);

  const handleImageClick = async (activityId: string) => {
    const activityData = await getActivity(activityId);
    console.log('activityData', activityData);
  };

  function getRandomColorWithOpacity(opacity: Number) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b}, ${opacity})`;
  }

  if (type === 'ai') {
    return (
      <div className="collection-ai">
        {userSavedAIPosts?.map((activityObj: any) => {
          const activityId = Object.keys(activityObj)[0];
          const activity = activityObj[activityId];

          const randomColorWithOpacity = getRandomColorWithOpacity(0.2);

          return (
            <div key={activityId} className="pre-view">
              <Link
                to={`/activity/${activityId}`}
                onClick={() => handleImageClick(activityId)}
              >
                <div
                  className="pre-view-title-box"
                  style={{ backgroundColor: randomColorWithOpacity }}
                >
                  <h2>{activity.title}</h2>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }

  if (type === 'others') {
    return (
      <div className="collection-others">
        {userSavedPosts?.map((activityObj: any) => {
          const activityId = Object.keys(activityObj)[0];
          const activity = activityObj[activityId];

          return (
            <div key={activityId} className="pre-view">
              <Link
                to={`/activity/${activityId}`}
                onClick={() => handleImageClick(activityId)}
              >
                <img
                  className="img"
                  src={activity.image}
                  alt={activity.title}
                />
              </Link>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="collection">
      {userInfo?.activities.map((activityObj) => {
        const [activityId, activity] = Object.entries(activityObj)[0];

        return (
          <div key={activityId} className="pre-view">
            <Link
              to={`/activity/${activityId}`}
              onClick={() => handleImageClick(activityId)}
            >
              <img className="img" src={activity.image} alt={activity.title} />
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Collection;
