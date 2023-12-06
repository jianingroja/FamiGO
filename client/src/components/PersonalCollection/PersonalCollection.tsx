import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CollectionContext } from '../../context/CollectionContext';

import CollectionNav from '../CollectionNav/CollectionNav';
import Collection from '../Collection/Collection';

const PersonalCollection = () => {
  const { state } = useLocation();
  const [collectionType, setCollectionType] = useState<string>('');

  useEffect(() => {
    if (state) {
      setCollectionType(state.type);
    } else {
      setCollectionType('mine');
    }
  }, [state]);

  return (
    <CollectionContext.Provider value={{ collectionType, setCollectionType }}>
      <CollectionNav />
      <Collection />
    </CollectionContext.Provider>
  );
};

export default PersonalCollection;
