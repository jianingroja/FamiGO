import { Link } from 'react-router-dom';
import { FeedActivity } from '../../types/feed';

import FilterTag from '../FilterTag/FilterTag';

import Logo from '../../assets/logo.png';
import './FeedItem.css';

const tempImg = Logo;

type Props = {
  activity: FeedActivity;
};

const FeedItem = ({ activity }: Props) => {
  const {
    _id: activityId,
    userInfo: { username },
    title,
    filters,
    likes,
    image,
  } = activity;

  const filterEntries = Object.entries(filters);
  const likesCount = likes.length;

  return (
    <div className="feed-item">
      <div className="info">
        <div className="avatar">
          <img src={tempImg} alt="avatar" />
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
      <div className="content">
        <Link to={`../activity/${activityId}`}>
          <img src={image} alt="activity image" />
        </Link>
      </div>
      <div className="status">
        <p>{likesCount} likes</p>
      </div>
      <p>{title}</p>
    </div>
  );
};
export default FeedItem;
