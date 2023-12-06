import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ConfirmToast } from 'react-confirm-toast';
import { useAppDispatch } from '../../redux/hooks';
import { IUser } from '../../types/user';
import { FeedActivity } from '../../types/feed';
import { getUserPlainInfo } from '../../services/users';
import {
  getActivity,
  getLikes,
  saveActivityInProfile,
  deleteActivity,
  saveLike,
} from '../../services/activity';
import { getMyUsername } from '../../redux/userSlice';
import { setAIDraftPublish } from '../../redux/activitySlice';
import Comment from '../Comment/Comment';
import CommentList from '../CommentList/CommentList';
import FilterTag from '../FilterTag/FilterTag';
import Spinner from '../Spinner/Spinner';
import { FiHeart } from 'react-icons/fi';
import { LuHeartOff } from 'react-icons/lu';
import { MdDeleteForever } from 'react-icons/md';
import { MdOutlineSaveAlt } from 'react-icons/md';
import './SpecificActivity.css';

const SpecificActivity = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const myUsername = getMyUsername();
  const { id } = useParams();
  const [activity, setActivity] = useState<FeedActivity | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showActivityComments, setshowActivityComments] = useState(false);
  const [refreshComments, setRefreshComments] = useState(0);
  const { title, image, likes, materials, description, userInfo } =
    activity || {};
  const { username, avatar } = user || {};
  const isMyProfile = myUsername === username;
  const location = useLocation();
  const { type } = location.state || {};

  useEffect(() => {
    const getActivityInfo = async () => {
      const res = await getActivity(id as string);
      setActivity(res);
    };

    getActivityInfo();
  }, [id]);

  useEffect(() => {
    if (activity) {
      const username = userInfo?.username;
      const getUser = async () => {
        const res = await getUserPlainInfo(username!);
        setUser(res);
      };

      getUser();

      checkLike();
      setIsLoading(false);
    }
  }, [activity]);

  const checkLike = async () => {
    const hasLiked = await getLikes(myUsername as string, id as string);
    setIsLiked(hasLiked);
  };

  const like = async () => {
    await saveLike(myUsername as string, id as string);
    setIsLiked((prev) => !prev);

    const activity = await getActivity(id!);
    setActivity(activity);
  };

  const saveActivity = async () => {
    const activityID = id;
    await saveActivityInProfile(myUsername!, activityID!);
    setIsSaved((prev) => !prev);
  };

  const deletePost = async () => {
    const deletePromise = deleteActivity(myUsername as string, id as string);

    await toast.promise(deletePromise, {
      loading: 'deleting...',
      success: <b>Deleted!</b>,
      error: <b>Fail to delete...</b>,
    });

    setTimeout(() => {
      navigate(`/profile/${myUsername}`);
    }, 2000);
  };

  const handleConfirmDelete = async () => {
    await deletePost();
    console.log('Confirmed!');
  };

  const filterEntries = Object.entries(activity?.filters || {});

  const redirectToPublishPage = () => {
    if (activity) {
      const { filters, title, description, materials } = activity;
      const OptionDefaultValues = Object.entries(filters).reduce(
        (acc: Record<string, object>, [key, value]) => {
          acc[key] = { label: value, value: value };
          return acc;
        },
        {}
      );
      const AIActivity = {
        title,
        description,
        ...OptionDefaultValues,
        materials,
      };
      dispatch(setAIDraftPublish(AIActivity));
    }
    navigate('/publish-activity');
  };

  if (isLoading) {
    return (
      <div className="specific-loading">
        <Spinner />;
      </div>
    );
  }

  return (
    <div className="specific-item">
      <br />
      <h2>{title}</h2>
      <br />
      <div className="info">
        <div className="avatar">
          <img src={avatar} alt="avatar" />
        </div>
        <p>{userInfo?.username}</p>
      </div>
      <div className="filters">
        {filterEntries.map(([label, value]) => (
          <FilterTag key={label} label={label} value={value} />
        ))}
      </div>
      <div className="content">
        {image && <img src={image} alt="activity image" />}
      </div>
      <div className="status">
        <p>{likes?.length} likes</p>
        <div className="status-buttons">
          <button
            className={`button ${isLiked ? 'button-grey' : ''}`}
            onClick={like}
          >
            {isLiked ? <LuHeartOff size={20} /> : <FiHeart size={20} />}
          </button>
          {!isMyProfile && (
            <button
              className={`button ${isSaved ? 'button-grey' : ''}`}
              onClick={saveActivity}
            >
              <MdOutlineSaveAlt size={20} />
            </button>
          )}
        </div>
      </div>
      <div className="materials-p">
        <p>What do we need?</p>
        {materials?.map((material, index) => (
          <div key={index}>
            <span className="list">- </span>
            {material}
          </div>
        ))}
      </div>
      <p>{description}</p>
      {type === 'ai' && (
        <div className="publish-savedAI">
          <button className="button" onClick={redirectToPublishPage}>
            Publish
          </button>
        </div>
      )}

      {!isAI && (
        <CommentSection
          myUsername={myUsername as string}
          activityId={id as string}
        />
          )}
          <div className="button-hide-all">
            <button
              className={`button ${showActivityComments ? '' : 'button-grey'}`}
              onClick={() => setshowActivityComments((prev) => !prev)}
            >
              {showActivityComments ? 'Hide all comments' : 'Show all comments'}
            </button>
          </div>
          {showActivityComments && (
            <CommentList activityID={id as string} refresh={refreshComments} />
          )}
          <br />
        </>
      )}
      {isMyProfile && (
        <ConfirmToast
          asModal={true}
          customCancel={'No'}
          customConfirm={'Yes'}
          customFunction={handleConfirmDelete}
          message={'Are you sure you want to delete?'}
          showCloseIcon={false}
          theme={'light'}
        >
          <div className="delete">
            <button className="button">
              <MdDeleteForever size={20} />
            </button>
          </div>
        </ConfirmToast>
      )}
    </div>
  );
};

export default SpecificActivity;
