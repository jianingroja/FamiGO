import './Collection.css';
import { UserInfo } from '../../types/user';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../../services/users';
import { getActivity } from '../../services/activity';

import Logo from '../../assets/logo.png';

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

  if (type === 'ai') {
    return (
      <div className="collection-ai">
        {userSavedAIPosts?.map((activityObj: any) => {
          const activityId = Object.keys(activityObj)[0];
          const activity = activityObj[activityId];

          return (
            <div key={activityId} className="pre-view">
              <Link
                to={`/activity/${activityId}`}
                onClick={() => handleImageClick(activityId)}
              >
                <img className="img" src={Logo} alt={activity.title} />
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
