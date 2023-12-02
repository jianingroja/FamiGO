import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { FeedActivity } from '../../types/feed';

type Props = {
  type: string;
  activity: FeedActivity;
};

const CollectionPreview = ({ type, activity }: Props) => {
  const navigate = useNavigate();
  const { _id: activityId, image, title } = activity;

  const handleClick = () => {
    navigate(`/activity/${activityId}`);
  };

  const genRandom = () => {
    return Math.floor(Math.random() * 256);
  };

  const getRandomRgba = (opacity: number) => {
    const bgColor = `rgb(${genRandom()}, ${genRandom()}, ${genRandom()}, ${opacity})`;
    return bgColor;
  };

  const previewClasses = classNames('pre-view', {
    ai: type === 'ai',
  });

  const previewStyle =
    type === 'ai'
      ? {
          backgroundColor: getRandomRgba(0.2),
        }
      : {};

  const previewContent =
    type === 'ai' ? (
      <h2>{title}</h2>
    ) : (
      <img className="img" src={image} alt={title} />
    );

  return (
    <div onClick={handleClick} className={previewClasses} style={previewStyle}>
      {previewContent}
    </div>
  );
};

export default CollectionPreview;
