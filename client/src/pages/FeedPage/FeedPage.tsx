import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { getNewlyPublishedActivity } from '../../redux/activitySlice';
import { getFeed, getFilteredFeed } from '../../services/feed';
import { FeedActivity, FiltersWithOptions } from '../../types/feed';
import FeedItem from '../../components/FeedItem/FeedItem';
import FiltersSelect from '../../components/FiltersSelect/FiltersSelect';

import './FeedPage.css';

export interface IFormInput {
  Topic: {};
  KidsNumber: {};
  AgeRange: {};
  Difficulty: {};
  Place: {};
  Duration: {};
}

const FeedPage = () => {
  const [feedItems, setFeedItems] = useState<FeedActivity[]>([]);
  const [filteredFeedItems, setFilteredFeedItems] = useState<FeedActivity[]>(
    []
  );
  const [hasFilters, setHasFilters] = useState<Boolean>(false);

  const { control, handleSubmit } = useForm<IFormInput>({});

  const myNewPublish = getNewlyPublishedActivity();
  const hasFeed = feedItems.length !== 0;
  // todo: optimize this condition check
  const hasFilteredItems = filteredFeedItems.length !== 0;

  const onSubmit: SubmitHandler<any> = async (data: FiltersWithOptions) => {
    const res = (await getFilteredFeed(data)) as FeedActivity[];
    setHasFilters(true);
    setFilteredFeedItems(res);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const getFeedItems = async () => {
      const res = await getFeed();
      if (!res) {
        navigate('/login');
      }
      setFeedItems(res as FeedActivity[]);
    };

    getFeedItems();
  }, []);

  return (
    <div className="feed-page">
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FiltersSelect control={control} />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      {hasFilters &&
        (hasFilteredItems ? (
          filteredFeedItems.map((feedItem) => (
            <FeedItem key={feedItem._id} activity={feedItem} />
          ))
        ) : (
          <p>no item, try another filter combination</p>
        ))}
      {myNewPublish && <FeedItem activity={myNewPublish} />}
      {hasFeed &&
        !hasFilters &&
        feedItems.map((feedItem) => (
          <FeedItem key={feedItem._id} activity={feedItem} />
        ))}
    </div>
  );
};

export default FeedPage;
