import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { getNewlyPublishedActivity } from '../../redux/activitySlice';
import { getFeed } from '../../services/feed';
import { FeedActivity } from '../../types/feed';
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
  const [postsByFilter, setPostsByFilter] = useState<FeedActivity[]>([]);

  const { control, handleSubmit } = useForm<IFormInput>({});

  const myNewPublish = getNewlyPublishedActivity();

  useEffect(() => {
    const getFeedItems = async () => {
      const res = (await getFeed()) as FeedActivity[];
      setFeedItems(res);
    };

    getFeedItems();
  }, []);

  const onSubmit: SubmitHandler<any> = (data) => {
    const apiEndpoint = 'http://localhost:3000/feed';
    console.log('Sending Request with Data:', data);

    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((dataReceived) => {
        console.log('Data Received:', dataReceived);
        const { activities } = dataReceived;
        setPostsByFilter(activities);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="feed-page">
      Filter Placeholder
      <form onSubmit={handleSubmit(onSubmit)}>
        <FiltersSelect control={control} />
        <button type="submit">Search</button>
      </form>
      {Boolean(postsByFilter.length) &&
        postsByFilter.map((feedItem) => (
          <FeedItem key={feedItem._id} activity={feedItem} />
        ))}
      {myNewPublish && <FeedItem activity={myNewPublish} />}
      {!!feedItems.length &&
        !postsByFilter.length &&
        feedItems.map((feedItem) => (
          <FeedItem key={feedItem._id} activity={feedItem} />
        ))}
    </div>
  );
};

export default FeedPage;
