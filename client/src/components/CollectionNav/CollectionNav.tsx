import { useState } from 'react';

import './CollectionNav.css';

type Props = {
  onNavClick: Function;
};

const CollectionNav = ({ onNavClick }: Props) => {
  const [activeNav, setActiveNav] = useState('mine');

  const navOptions = {
    mine: 'mine',
    others: 'others',
    ai: 'ai',
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
