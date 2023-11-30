import { useEffect, useState } from 'react';
import { BaseSyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import './GeneratedActivity.css';
import Save from '../../assets/SavedAIPosts.svg';
import New from '../../assets/New.svg';

interface IActivity {
  activity: {
    filters: Array<String>;
    title: String;
    materials: Array<String>;
    description: String;
  };
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
}

const GeneratedActivity: React.FC<IActivity> = ({ activity, onSubmit }) => {
  const [newClickCount, setNewClickCount] = useState(0);

  useEffect(() => {
    if (activity) {
      console.log(document.body.scrollHeight);
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
    console.log('savedActivity', savedActivity);
    fetch('http://localhost:3000/save-activity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(savedActivity),
    }).catch((error) => {
      console.error('Error:', error);
    });
  };

  const handleSubmit = (e: any) => {
    if (newClickCount < 3) {
      setNewClickCount(newClickCount + 1);
      onSubmit(e);
      console.log('e', e);
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
        <Link to="/profile" className="saveredirect-btn">
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
