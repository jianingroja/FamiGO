import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { checkAuthentication } from '../../services/auth';
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasChecked, setHasChecked] = useState<boolean>(false);
  const [postsByFilter, setPostsByFilter] = useState();

  const { control, handleSubmit } = useForm<IFormInput>({});

  const navigate = useNavigate();

  const [feedItems, setFeedItems] = useState<FeedActivity[]>([]);

  useEffect(() => {
    (async () => {
      const authRes = await checkAuthentication();

      setIsAuthenticated(authRes);
      setHasChecked(true);
    })();
  }, []);

  useEffect(() => {
    const getFeedItems = async () => {
      const res = (await getFeed()) as FeedActivity[];
      setFeedItems(res);
    };

    getFeedItems();
  }, []);

  if (hasChecked) {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }

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
      {hasChecked && isAuthenticated && (
        <>
          Filter Placeholder
          <form onSubmit={handleSubmit(onSubmit)}>
            <FiltersSelect control={control} />
            <button type="submit">Search</button>
          </form>
          {!!feedItems.length &&
            feedItems.map((feedItem) => <FeedItem activity={feedItem} />)}
        </>
      )}
    </div>
  );
};

export default FeedPage;
