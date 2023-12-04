import { useState } from 'react';

import CollectionNav from '../CollectionNav/CollectionNav';
import Collection from '../Collection/Collection';

type Props = {
  isMyProfile: boolean;
  currentProfile: string;
};

const PersonalCollection = ({ isMyProfile, currentProfile }: Props) => {
  const [collectionType, setCollectionType] = useState('mine');

  const handleNavClick = (type: string) => {
    setCollectionType(type);
  };

  return (
    <>
      <CollectionNav onNavClick={handleNavClick} showAllNavs={isMyProfile} />
      <Collection type={collectionType} currentProfile={currentProfile} />
    </>
  );
};

export default PersonalCollection;
