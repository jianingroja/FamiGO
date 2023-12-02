import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserCollectionByType } from '../../services/users';
import { FeedActivity } from '../../types/feed';

import CollectionPreview from '../CollectionPreview/CollectionPreview';

import './Collection.css';

type Props = {
  type: string;
};

const Collection = ({ type }: Props) => {
  const { username } = useParams();
  const [collection, setCollection] = useState<FeedActivity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getCollection() {
      const collection = await getUserCollectionByType(
        username as string,
        type
      );
      setCollection(collection);
      setIsLoading(false);
    }

    getCollection();
  }, [type]);

  if (isLoading) {
    return <p>loading</p>;
  }

  return (
    <div className="collection">
      {collection.map((activity) => (
        <CollectionPreview key={activity._id} activity={activity} type={type} />
      ))}
    </div>
  );
};

export default Collection;
