import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ConfirmToast } from 'react-confirm-toast';
import { useAppDispatch } from '../../redux/hooks';
import { getMyUsername } from '../../redux/userSlice';
import { setAIDraftPublish } from '../../redux/activitySlice';
import { FeedActivity } from '../../types/feed';
import { getActivity, deleteActivity } from '../../services/activity';

import FeedItem from '../FeedItem/FeedItem';
import CommentSection from '../CommentSection/CommentSection';
import Spinner from '../Spinner/Spinner';

import { MdDeleteForever } from 'react-icons/md';
import './SpecificActivity.css';

const SpecificActivity = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const myUsername = getMyUsername();

  const [activity, setActivity] = useState<FeedActivity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { title, materials, description, userInfo, type } = activity || {};
  const isMyActivity = myUsername === userInfo?.username;
  const isAI = type === 'saved';

  useEffect(() => {
    const getActivityInfo = async () => {
      const res = await getActivity(id as string);
      setActivity(res);
      setIsLoading(false);
    };

    getActivityInfo();
  }, [id]);

  const handleDelete = async () => {
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
      <h2>{title}</h2>
      {activity && <FeedItem activity={activity!} isFeed={false} isAI={isAI} />}

      <div className="materials">
        <p>What do we need?</p>
        {materials?.map((material, index) => (
          <span key={index}>- {material}</span>
        ))}
      </div>

      <p className="description">{description}</p>

      {isAI && (
        <div className="publish-ai">
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

      {isMyActivity && (
        <ConfirmToast
          asModal={true}
          customCancel={'No'}
          customConfirm={'Yes'}
          customFunction={handleDelete}
          message={'Are you sure you want to delete?'}
          showCloseIcon={false}
          theme={'light'}
        >
          <div className="delete-section">
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
