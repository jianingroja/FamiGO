import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';

import './Header.css';

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  const iconStyle = { width: '100%', height: '100%', color: 'white' };

  return (
    <div className="header">
      <button className="btn-go-back" onClick={handleClick}>
        <FaChevronLeft style={iconStyle} />
      </button>
      <span>{title}</span>
    </div>
  );
};

export default Header;
