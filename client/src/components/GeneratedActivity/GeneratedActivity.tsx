interface IActivity {
  activity: {
    filters: Array<String>;
    title: String;
    materials: Array<String>;
    description: String;
  };
}

const GeneratedActivity: React.FC<IActivity> = ({ activity }) => {
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
  return (
    <div>
      <h2>{activity.title}</h2>
      <div>
        {activity.filters.map((filter, index) => (
          <div key={index}># {filter}</div>
        ))}
      </div>
      <div>
        {activity.materials.map((material, index) => (
          <div key={index}>-{material}</div>
        ))}
      </div>
      <p>{activity.description}</p>
      <button className="save-button" onClick={handleSaveClick}>
        Save
      </button>
    </div>
  );
};

export default GeneratedActivity;
