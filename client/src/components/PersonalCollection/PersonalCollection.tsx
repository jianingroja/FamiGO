import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import CollectionNav from '../CollectionNav/CollectionNav';
import Collection from '../Collection/Collection';

type Props = {
  isMyProfile: boolean;
  currentProfile: string;
};

const PersonalCollection = ({ isMyProfile, currentProfile }: Props) => {
  const { state } = useLocation();
  const [collectionType, setCollectionType] = useState(
    (state?.type as string) || 'mine'
  );

  const handleNavClick = (type: string) => {
    setCollectionType(type);
  };

  return (
    <>
      <CollectionNav
        activeNav={collectionType}
        onNavClick={handleNavClick}
        showAllNavs={isMyProfile}
      />
      <Collection type={collectionType} currentProfile={currentProfile} />
    </>
  );
};

export default PersonalCollection;
