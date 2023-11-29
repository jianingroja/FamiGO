import { FeedActivity } from '../../types/feed';

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
    image,
  } = activity;

  return (
    <div className="feed-item">
      <div className="info">
        <div className="avatar">
          <img src={tempImg} alt="avatar" />
        </div>
        <p>{username}</p>
      </div>
      <div className="content">
        <img src={image} alt="activity image" />
      </div>
      <div className="status">
        <p>321 likes</p>
        <div className="actions">
          <p>like</p>
          <p>comment</p>
          <p>save</p>
        </div>
      </div>
      <p>{description}</p>
      <p>Here is a description of my experience</p>
      <p>view all comments</p>
    </div>
  );
};
export default FeedItem;
