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
    userInfo: { username },
    description,
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
        <p>{username}</p>
      </div>
      <div className="filters">
        {filterEntries.map(([label, value]) => (
          <FilterTag label={label} value={value} />
        ))}
      </div>
      <div className="content">
        <img src={image} alt="activity image" />
      </div>
      <div className="status">
        <p>{likesCount} likes</p>
        <div className="actions">
          <p>like</p>
          <p>comment</p>
          <p>save</p>
        </div>
      </div>
      <p>{description}</p>
      <p>view all comments</p>
    </div>
  );
};
export default FeedItem;
