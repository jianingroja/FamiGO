import { HiOutlineSquares2X2 } from 'react-icons/hi2';
import { MdSaveAlt } from 'react-icons/md';
import { BsBookmark } from 'react-icons/bs';

import './CollectionNav.css';

type Props = {
  activeNav: string;
  onNavClick: Function;
  showAllNavs: Boolean;
};

const CollectionNav = ({ activeNav, onNavClick, showAllNavs }: Props) => {
  const mineNav = { label: 'mine', icon: <HiOutlineSquares2X2 size={24} /> };
  const othersNav = { label: 'others', icon: <MdSaveAlt size={22} /> };
  const aiNav = { label: 'ai', icon: <BsBookmark size={20} /> };

  const navOptions = showAllNavs ? [mineNav, othersNav, aiNav] : [mineNav];

  return (
    <div className="collection-nav">
      {navOptions.map(({ label, icon }) => {
        const isActive = activeNav === label;

        return (
          <button
            key={label}
            className={`btn ${isActive ? 'active' : ''}`}
            onClick={() => onNavClick(label)}
          >
            {icon}
          </button>
        );
      })}
    </div>
  );
};

export default CollectionNav;
