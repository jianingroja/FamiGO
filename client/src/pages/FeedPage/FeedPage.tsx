import { useState, useEffect } from 'react';
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

  const { control, handleSubmit } = useForm<IFormInput>({});

  const myNewPublish = getNewlyPublishedActivity();
  const hasFeed = feedItems.length !== 0;
  const hasFiltered = filteredFeedItems.length !== 0;

  const onSubmit: SubmitHandler<any> = async (data: FiltersWithOptions) => {
    const res = (await getFilteredFeed(data)) as FeedActivity[];
    setFilteredFeedItems(res);
  };

  useEffect(() => {
    const getFeedItems = async () => {
      const res = (await getFeed()) as FeedActivity[];
      setFeedItems(res);
    };

    getFeedItems();
  }, []);

  return (
    <div className="feed-page">
      Filter Placeholder
      <form onSubmit={handleSubmit(onSubmit)}>
        <FiltersSelect control={control} />
        <button type="submit">Search</button>
      </form>
      {hasFiltered &&
        filteredFeedItems.map((feedItem) => (
          <FeedItem key={feedItem._id} activity={feedItem} />
        ))}
      {myNewPublish && <FeedItem activity={myNewPublish} />}
      {hasFeed &&
        !hasFiltered &&
        feedItems.map((feedItem) => (
          <FeedItem key={feedItem._id} activity={feedItem} />
        ))}
    </div>
  );
};

export default FeedPage;
