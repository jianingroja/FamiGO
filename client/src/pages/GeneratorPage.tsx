import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import NavOutlet from '../components/NavOutlet';
import GenerateForm from '../components/GenerateForm/GenerateForm';
import GeneratedActivity from '../components/GeneratedActivity/GeneratedActivity';

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

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
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
        setActivity(dataReceived);
        // If working with MOCK data, use:
        // setActivity(dataReceived.openAIResponse.content);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Generate an activity</h1>
      <p>Based on your preferences:</p>
      <GenerateForm control={control} onSubmit={handleSubmit(onSubmit)} />
      {activity && <GeneratedActivity activity={activity} />}
      <NavOutlet />
    </div>
  );
};
export default GeneratorPage;
