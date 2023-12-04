import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { IUser } from '../../types/user';
import { FeedActivity } from '../../types/feed';
import { getUserPlainInfo } from '../../services/users';
import {
  getActivity,
  getLikes,
  deleteActivity,
  saveLike,
} from '../../services/activity';
import { getMyUsername } from '../../redux/userSlice';

import Comment from '../Comment/Comment';
import CommentList from '../CommentList/CommentList';
import FilterTag from '../FilterTag/FilterTag';

import './SpecificActivity.css';

const SpecificActivity = () => {
  const navigate = useNavigate();
  const myUsername = getMyUsername();
  const { id } = useParams();
  const [activity, setActivity] = useState<FeedActivity | null>(null);
  const [user, setUser] = useState<IUser | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [showComment, setShowComment] = useState(false);
  const [showActivityComments, setshowActivityComments] = useState(true);
  const [refreshComments, setRefreshComments] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const { title, image, likes, description, userInfo } = activity || {};
  const { username, avatar } = user || {};

  const isMyProfile = myUsername === username;

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

  const deletePost = async () => {
    const deletePromise = deleteActivity(myUsername as string, id as string);

    await toast.promise(deletePromise, {
      loading: 'deleting...',
      success: <b>deleted!</b>,
      error: <b>fail to delete...</b>,
    });

    setTimeout(() => {
      navigate(`/profile/${myUsername}`);
    }, 2000);
  };

  const like = async () => {
    await saveLike(myUsername as string, id as string);
    const activity = await getActivity(id!);
    setActivity(activity);
  };

  const filterEntries = Object.entries(activity?.filters || {});

  if (isLoading) {
    return (
      <div className="specific-loading">
        <Spinner />;
      </div>
    );
  }

  return (
    <div className="feed-item">
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

        <button
          className={`button ${isLiked ? 'button-grey' : ''}`}
          onClick={like}
        >
          {isLiked ? 'Unlike' : 'Like'}
        </button>
      </div>
      <p>{description}</p>
      <div className="actions">
        <p>
          <button
            className={`button ${showComment ? 'button-grey' : ''}`}
            onClick={() => setShowComment((prev) => !prev)}
          >
            {showComment ? 'Hide' : 'Add a comment'}
          </button>
        </p>
      </div>
      <div className="delete">
        {isMyProfile && (
          <button className="button" onClick={() => deletePost()}>
            Delete post
          </button>
        )}
      </div>
      {showComment && (
        <Comment
          myUsername={myUsername!}
          activityID={id as string}
          onCommentSubmitted={() => {
            setShowComment(false);
            setRefreshComments((prev) => prev + 1);
          }}
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
    </div>
  );
};

export default SpecificActivity;
