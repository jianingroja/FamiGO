import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserCollectionByType } from '../../services/users';
import { useAppDispatch } from '../../redux/hooks';
import { setCollection, getCollection } from '../../redux/activitySlice';
import { FeedActivity } from '../../types/feed';

import CollectionPreview from '../CollectionPreview/CollectionPreview';
import Spinner from '../Spinner/Spinner';

import './Collection.css';

type Props = {
  type: string;
};

const Collection = ({ type }: Props) => {
  const dispatch = useAppDispatch();
  const { username } = useParams();
  const [col, setCol] = useState<FeedActivity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const collection = getCollection(type);

  const fetchCollection = async (signal?: AbortSignal) => {
    const col = await getUserCollectionByType(username as string, type, signal);

    setCol(col);
    dispatch(setCollection({ type, value: col }));
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchCollection();
  }, [username]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (collection) {
      setCol(collection);
    } else {
      setIsLoading(true);
      fetchCollection(signal);
    }

    return () => {
      setCol([]);
      controller.abort('abort');
    };
  }, [type]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="collection">
      {col.map((activity) => (
        <CollectionPreview key={activity._id} activity={activity} type={type} />
      ))}
    </div>
  );
};

export default Collection;
