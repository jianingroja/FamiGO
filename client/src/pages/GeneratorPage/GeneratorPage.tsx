import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import NavOutlet from '../../components/NavOutlet';
import GenerateForm from '../../components/GenerateForm/GenerateForm';
import GeneratedActivity from '../../components/GeneratedActivity/GeneratedActivity';
import { postGeneratedActivity } from '../../services/activity';
import { IFormInput } from '../../types/activity';
import './GeneratorPage.css';

const GeneratorPage = () => {
  const { control, handleSubmit } = useForm<IFormInput>({});
  const [activity, setActivity] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setLoading(true);

    postGeneratedActivity(data)
      .then((dataReceived) => {
        console.log('dataReceived', dataReceived);
        // If working with openAI, use:
        // setActivity(dataReceived);
        // setLoading(false);

        // If working with MOCK data, use:
        if (dataReceived.matchingActivity!) {
          setActivity(dataReceived.matchingActivity);
          setLoading(false);
        } else {
          console.error('No match have been found in mock data');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="generator-page">
      <br />
      <br />
      <h1>Generate an activity</h1>
      <GenerateForm control={control} onSubmit={handleSubmit(onSubmit)} />
      {loading && <p className="loading-text">Loading...</p>}
      {activity && (
        <GeneratedActivity
          activity={activity}
          onSubmit={handleSubmit(onSubmit)}
        />
      )}
      <NavOutlet />
    </div>
  );
};
export default GeneratorPage;
