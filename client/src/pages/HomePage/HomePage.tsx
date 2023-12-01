import Logo from '../../assets/logo.png';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="spinner-container">
        <img src={Logo} alt="logo" />
      </div>
    </div>
  );
};
export default HomePage;
