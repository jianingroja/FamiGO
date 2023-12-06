import { useContext } from 'react';
import { ProfileContext } from '../../context/ProfileContext';
import { CollectionContext } from '../../context/CollectionContext';

import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { MdSaveAlt } from 'react-icons/md';
import { BsBookmark } from 'react-icons/bs';

import './CollectionNav.css';

const CollectionNav = () => {
  const { isMyProfile } = useContext(ProfileContext);
  const { collectionType: activeNav, setCollectionType } =
    useContext(CollectionContext);

  const mineNav = { label: 'mine', icon: <HiOutlineSquares2X2 size={24} /> };
  const othersNav = { label: 'others', icon: <MdSaveAlt size={22} /> };
  const aiNav = { label: 'ai', icon: <BsBookmark size={20} /> };

  const navOptions = isMyProfile ? [mineNav, othersNav, aiNav] : [mineNav];

  return (
    <div className="collection-nav">
      {navOptions.map(({ label, icon }) => {
        const isActive = activeNav === label;

        return (
          <button
            key={label}
            className={`btn ${isActive ? 'active' : ''}`}
            onClick={() => setCollectionType(label)}
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
};

export default CollectionNav;
