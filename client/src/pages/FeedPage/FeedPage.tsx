import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [postsByFilter, setPostsByFilter] = useState();

  const { control, handleSubmit } = useForm<IFormInput>({});

  const [feedItems, setFeedItems] = useState<FeedActivity[]>([]);

  const myNewPublish = getNewlyPublishedActivity();

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
        setPostsByFilter(dataReceived);
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
      {myNewPublish && <FeedItem activity={myNewPublish} />}
      {!!feedItems.length &&
        feedItems.map((feedItem) => (
          <FeedItem key={feedItem._id} activity={feedItem} />
        ))}
    </div>
  );
};

export default FeedPage;
