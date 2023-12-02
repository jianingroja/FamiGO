import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa6';

import './Header.css';

type Props = {
  title: string;
  onGoBackClick?: Function;
};

const Header = ({ title, onGoBackClick }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onGoBackClick) {
      onGoBackClick();
    } else {
      navigate(-1);
    }
  };

  const iconStyle = { width: '100%', height: '100%', color: 'white' };

  return (
    <div className="header">
      <button className="btn-go-back" onClick={handleClick}>
        <FaChevronLeft style={iconStyle} />
      </button>
      <h2>{title}</h2>
    </div>
  );
};

export default Header;
