import { useState } from 'react';
import CollectionNav from '../CollectionNav/CollectionNav';
import Collection from '../Collection/Collection';

const PersonalCollection = () => {
  const [collectionType, setCollectionType] = useState('mine');

  const handleNavClick = (type: string) => {
    setCollectionType(type);
  };

  return (
    <div>
      <CollectionNav onNavClick={handleNavClick} />
      <Collection type={collectionType} />
    </div>
  );
};

export default PersonalCollection;
