import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { getNewlyPublishedActivity } from '../../redux/activitySlice';
import { getMyUsername } from '../../redux/userSlice';
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
  const [showFilters, setShowFilters] = useState(false);
  const { control, handleSubmit, reset } = useForm<IFormInput>({});

  const myNewPublish = getNewlyPublishedActivity();
  const myUsername = getMyUsername();
  const hasFeed = feedItems.length !== 0;
  // todo: optimize this condition check
  const hasFilteredItems = filteredFeedItems.length !== 0;

  const onSubmit: SubmitHandler<any> = async (data: FiltersWithOptions) => {
    const res = (await getFilteredFeed(data)) as FeedActivity[];
    setHasFilters(true);
    setFilteredFeedItems(res);
    setShowFilters(false);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
    setShowFilters(true);
  };

  const clearFilters = () => {
    reset({});
    setHasFilters(false);
    setShowFilters(true);
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

  useEffect(() => {
    if (myNewPublish) {
      toast(`New activity from ${myUsername}`, {
        icon: '👏',
        duration: 4000,
        id: 'newPub',
      });
    }
  }, [myNewPublish]);

  return (
    <div className="feed-page">
      <div>
        <div className="box-button-filter">
          <button className="button-filter" onClick={toggleFilters}>
            Select a filter
          </button>
        </div>
        {showFilters && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FiltersSelect control={control} />
            <button className="button" type="submit">
              Search
            </button>
          </form>
        )}
      </div>

      {hasFilters &&
        (hasFilteredItems ? (
          filteredFeedItems.map((feedItem) => (
            <FeedItem key={feedItem._id} activity={feedItem} isFeed />
          ))
        ) : (
          <div className="no-filter-result">
            <p>
              No item found...
              <br /> Try another filter combination.
            </p>
            <button className="btn-clear" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        ))}
      {myNewPublish && <FeedItem activity={myNewPublish} isFeed />}
      {hasFeed &&
        !hasFilters &&
        feedItems.map((feedItem) => (
          <FeedItem key={feedItem._id} activity={feedItem} isFeed />
        ))}
    </div>
  );
};

export default FeedPage;
