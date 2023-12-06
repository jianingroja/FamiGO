import { useEffect, useState, useContext } from 'react';
import { getUserCollectionByType } from '../../services/users';
import { useAppDispatch } from '../../redux/hooks';
import {
  setCollection,
  getCollection,
  clearCollection,
} from '../../redux/activitySlice';
import { ProfileContext } from '../../context/ProfileContext';
import { CollectionContext } from '../../context/CollectionContext';

import { FeedActivity } from '../../types/feed';

import CollectionPreview from '../CollectionPreview/CollectionPreview';
import Spinner from '../Spinner/Spinner';

import './Collection.css';

const Collection = () => {
  const { currentProfile } = useContext(ProfileContext);
  const { collectionType: type } = useContext(CollectionContext);

  const dispatch = useAppDispatch();
  const [col, setCol] = useState<FeedActivity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const collection = getCollection(type);

  const fetchCollection = async (signal?: AbortSignal) => {
    const col = await getUserCollectionByType(currentProfile, type, signal);

    setCol(col);
    dispatch(setCollection({ type, value: col }));
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    fetchCollection();

    return () => {
      dispatch(clearCollection());
    };
  }, [currentProfile]);

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
