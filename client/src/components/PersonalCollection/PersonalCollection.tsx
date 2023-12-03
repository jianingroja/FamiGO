import { useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { IUser } from '../../types/user';

import CollectionNav from '../CollectionNav/CollectionNav';
import Collection from '../Collection/Collection';

const PersonalCollection = () => {
  const [collectionType, setCollectionType] = useState('mine');

  const { username: currentProfile } = useParams();
  const { user } = useAuth();
  const { username } = (user as IUser) || {};

  const isMyProfile = currentProfile === username;

  const handleNavClick = (type: string) => {
    setCollectionType(type);
  };

  return (
    <div>
      <CollectionNav onNavClick={handleNavClick} showAllNavs={isMyProfile} />
      <Collection type={collectionType} />
    </div>
  );
};

export default PersonalCollection;
