import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAppDispatch } from '../../redux/hooks';
import {
  addSavedPost,
  removeSavedPost,
  getMyUsername,
  getMySavedPost,
} from '../../redux/userSlice';
import { FeedActivity } from '../../types/feed';
import { IUser } from '../../types/user';
import { getUserPlainInfo } from '../../services/users';
import {
  getLikes,
  saveLike,
  saveActivityInProfile,
} from '../../services/activity';

import FilterTag from '../FilterTag/FilterTag';
import { FiHeart } from 'react-icons/fi';
import { LuHeartOff } from 'react-icons/lu';
import { MdOutlineSaveAlt } from 'react-icons/md';
import Logo from '../../assets/logo.png';
import './FeedItem.css';

const tempImg = Logo;

type Props = {
  activity: FeedActivity;
  isFeed: boolean;
  isAI?: boolean;
};

const FeedItem = ({ activity, isFeed, isAI = false }: Props) => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<IUser | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(activity.likes.length);

  const {
    _id: activityId,
    userInfo: { username },
    title,
    filters,
    image,
  } = activity;
  const { avatar } = user || {};

  const myUsername = getMyUsername();
  const isMyActivity = myUsername === username;
  const mySaved = getMySavedPost();
  const isMySaved = mySaved?.includes(activityId);

  const filterEntries = Object.entries(filters);

  const checkLike = async () => {
    const isLiked = await getLikes(myUsername as string, activityId as string);
    setIsLiked(isLiked);
  };

  const likeActivity = async () => {
    await saveLike(myUsername as string, activityId as string);
    setIsLiked((prev) => !prev);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const saveActivity = async () => {
    const savePromise = saveActivityInProfile(myUsername as string, activityId);

    await toast.promise(savePromise, {
      loading: 'Processing...',
      success: <b>{isSaved ? 'Unsaved!' : 'Saved!'}</b>,
      error: <b>Fail to process...</b>,
    });

    setIsSaved((prev) => !prev);
    if (isSaved) {
      dispatch(removeSavedPost(activityId as string));
    } else {
      dispatch(addSavedPost(activityId as string));
    }

    return;
  };

  useEffect(() => {
    if (activity) {
      const getUser = async () => {
        const res = await getUserPlainInfo(username!);
        setUser(res);
      };

      getUser();
      checkLike();
      setIsSaved(isMySaved as boolean);
    }
  }, [activity]);

  return (
    <div className={`feed-item ${isAI ? 'ai' : ''}`}>
      <div className="info">
        <div className="avatar">
          <img src={avatar || tempImg} alt="avatar" />
        </div>
        <Link to={`../profile/${username}`}>
          <p>{username}</p>
        </Link>
      </div>
      <div className="filters">
        {filterEntries.map(([label, value]) => (
          <FilterTag key={label} label={label} value={value} />
        ))}
      </div>
      {!isAI && (
        <div className="content">
          <Link to={`../activity/${activityId}`}>
            <img src={image} alt="activity image" />
          </Link>
        </div>
      )}
      <div className="status">
        {!isAI && <p>{likesCount} likes</p>}
        {!isMyActivity && !isAI && (
          <div className="actions">
            <button
              className={`button ${isLiked ? 'btn-grey' : ''}`}
              onClick={likeActivity}
            >
              {isLiked ? <LuHeartOff size={18} /> : <FiHeart size={18} />}
            </button>
            <button
              className={`button ${isSaved ? 'btn-grey' : ''}`}
              onClick={saveActivity}
            >
              <MdOutlineSaveAlt size={20} />
            </button>
          </div>
        )}
      </div>
      {isFeed && <p>{title}</p>}
    </div>
  );
};
export default FeedItem;
