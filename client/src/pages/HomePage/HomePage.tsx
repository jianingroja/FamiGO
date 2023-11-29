import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuthentication } from '../../services/auth';

import Logo from '../../assets/logo.png';
import './HomePage.css';

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasChecked, setHasChecked] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const authRes = await checkAuthentication();

      setIsAuthenticated(authRes);
      setHasChecked(true);
    })();
  }, []);

  if (hasChecked) {
    if (isAuthenticated) {
      navigate('/feed');
    } else {
      navigate('/login');
    }
  }

  return (
    <div className="home-page">
      <div className="spinner-container">
        <img src={Logo} alt="logo" />
      </div>
    </div>
  );
};
export default HomePage;
