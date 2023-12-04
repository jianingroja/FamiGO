import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="not-found-page">
      <div className="solution">
        <p>
          opps... <br />
          seems like this page doesn't exit
        </p>
        <button className="button" onClick={() => navigate('/feed')}>
          go to feed
        </button>
      </div>
      <Spinner />
    </div>
  );
};
export default NotFoundPage;
