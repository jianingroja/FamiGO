import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './GeneratedActivity.css';
import Save from '../../assets/Save.svg';
import New from '../../assets/New.svg';
import { IActivity, ISavedActivity } from '../../types/activity';
import { saveActivity } from '../../services/activity';
import { getMyUsername } from '../../redux/userSlice';

const GeneratedActivity: React.FC<IActivity> = ({ activity, onSubmit }) => {
  const username = getMyUsername();
  const [newClickCount, setNewClickCount] = useState(0);

  useEffect(() => {
    if (activity) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [activity]);

  const handleSaveClick = () => {
    const topic = activity.filters[0];
    const numOfKids = activity.filters[1];
    const age = activity.filters[2];
    const difficulty = activity.filters[3];
    const place = activity.filters[4];
    const duration = activity.filters[5];

    const filters = { topic, numOfKids, age, difficulty, place, duration };
    const title = activity.title;
    const materials = activity.materials;
    const description = activity.description;
    const type = 'saved';
    const username = '';
    const userInfo = { username };

    const savedActivity = {
      filters,
      title,
      materials,
      description,
      type,
      userInfo,
    };

    saveActivity(savedActivity as ISavedActivity).catch((error) => {
      console.error('saveActivity AI failed:', error);
    });
  };

  const handleSubmit = (e: any) => {
    if (newClickCount < 3) {
      setNewClickCount(newClickCount + 1);
      onSubmit(e);
    }
  };

  const remainingClicks = 3 - newClickCount;

  return (
    <div className="generated-activity-container">
      <h2>{activity.title}</h2>
      <div className="filters-box">
        {activity.filters.map((filter, index) => (
          <div key={index}>
            <span className="list">#</span>
            {filter}
          </div>
        ))}
      </div>
      <div className="materials-p">
        {activity.materials.map((material, index) => (
          <div key={index}>
            <span className="list">- </span>
            {material}
          </div>
        ))}
      </div>
      <p>{activity.description}</p>
      <div className="button-box">
        <Link to={`/profile/${username}`} className="saveredirect-btn">
          <button className="button" onClick={handleSaveClick}>
            <img src={Save} alt="SaveIcon" />
            Save
          </button>
        </Link>
        <form onSubmit={handleSubmit}>
          <button
            className="button"
            type="submit"
            disabled={newClickCount >= 3}
          >
            <img src={New} alt="SaveIcon" />
            New
          </button>
          <p>{remainingClicks}/3</p>
        </form>
      </div>
    </div>
  );
};

export default GeneratedActivity;
