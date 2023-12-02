import { useState } from 'react';
import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { MdSaveAlt } from 'react-icons/md';
import { BsBookmark } from 'react-icons/bs';

import './CollectionNav.css';

type Props = {
  onNavClick: Function;
  showAllNavs: Boolean;
};

const CollectionNav = ({ onNavClick, showAllNavs }: Props) => {
  const [activeNav, setActiveNav] = useState('mine');

  const mineNav = { label: 'mine', icon: <HiOutlineSquares2X2 size={24} /> };
  const othersNav = { label: 'others', icon: <MdSaveAlt size={22} /> };
  const aiNav = { label: 'ai', icon: <BsBookmark size={20} /> };

  const navOptions = showAllNavs ? [mineNav, othersNav, aiNav] : [mineNav];

  const handleClick = (navType: string) => {
    setActiveNav(navType);
    onNavClick(navType);
  };

  return (
    <div className="collection-nav">
      {navOptions.map(({ label, icon }) => {
        const isActive = activeNav === label;

        return (
          <button
            key={label}
            className={`btn ${isActive ? 'active' : ''}`}
            onClick={() => handleClick(label)}
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
};

export default CollectionNav;
