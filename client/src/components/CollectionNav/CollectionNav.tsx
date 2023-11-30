import { useState } from 'react';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { MdSaveAlt } from 'react-icons/md';
import { BsBookmark } from 'react-icons/bs';

import './CollectionNav.css';

type Props = {
  onNavClick: Function;
};

const CollectionNav = ({ onNavClick }: Props) => {
  const [activeNav, setActiveNav] = useState('mine');

  const navOptions = {
    mine: <HiOutlineSquares2X2 size={24} />,
    others: <MdSaveAlt size={22} />,
    ai: <BsBookmark size={20} />,
  };

  const handleClick = (navType: string) => {
    setActiveNav(navType);
    onNavClick(navType);
  };

  return (
    <div className="collection-nav">
      {Object.entries(navOptions).map(([key, value]) => {
        const isActive = activeNav === key;

        return (
          <button
            key={key}
            className={`btn ${isActive ? 'active' : ''}`}
            onClick={() => handleClick(key)}
          >
            {value}
          </button>
        );
      })}
    </div>
  );
};

export default CollectionNav;
