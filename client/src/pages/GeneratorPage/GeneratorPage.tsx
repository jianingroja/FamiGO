import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import NavOutlet from '../../components/NavOutlet';
import GenerateForm from '../../components/GenerateForm/GenerateForm';
import GeneratedActivity from '../../components/GeneratedActivity/GeneratedActivity';
import './GeneratorPage.css';

export interface IFormInput {
  Topic: {};
  KidsNumber: {};
  AgeRange: {};
  Difficulty: {};
  Place: {};
  Duration: {};
}

const GeneratorPage = () => {
  const { control, handleSubmit } = useForm<IFormInput>({});
  const [activity, setActivity] = useState();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setLoading(true);
    const apiEndpoint = 'http://localhost:3000/generator';
    console.log('data', data);
    fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((dataReceived) => {
        console.log('dataReceived', dataReceived);
        // If working with openAI, use:
        // setActivity(dataReceived);
        // If working with MOCK data, use:
        setActivity(dataReceived.openAIResponse.content);
        setLoading(false);
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
