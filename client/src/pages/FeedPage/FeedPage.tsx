import FeedItem from '../../components/FeedItem/FeedItem';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuthentication } from '../../services/auth';

import './FeedPage.css';

const FeedPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasChecked, setHasChecked] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const authRes = await checkAuthentication();

      setIsAuthenticated(authRes);
      setHasChecked(true);
    })();
  }, []);

  if (hasChecked) {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }

  return (
    <div className="feed-page">
      {hasChecked && isAuthenticated && (
        <>
          Filter Placeholder
          <FeedItem />
          <FeedItem />
          <FeedItem />
        </>
      )}
    </div>
  );
};

export default FeedPage;
