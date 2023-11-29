import { BaseSyntheticEvent } from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';
import './GenerateForm.css';

type Options = {
  value: String;
  label: String;
};
interface GenerateFormProps {
  control: any;
  onSubmit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
}

const GenerateForm: React.FC<GenerateFormProps> = ({ control, onSubmit }) => {
  const topicOptions = [
    { value: 'Nature', label: 'Nature' },
    { value: 'Art', label: 'Art' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Constructions', label: 'Constructions' },
    { value: 'Logic', label: 'Logic' },
    { value: 'Linguistic', label: 'Linguistic' },
  ];

  const kidsOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: 'more than 3', label: 'more than 3' },
  ];

  const ageRangeOptions = [
    { value: '0 - 3', label: '0 - 3' },
    { value: '3 - 5', label: '3 - 5' },
    { value: '5 - 7', label: '5 - 7' },
    { value: '7 - 9', label: '7 - 9' },
    { value: '9 - 12', label: '9 - 12' },
    { value: '12 - 14', label: '12 - 14' },
  ];

  const difficultyOptions = [
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Expert', label: 'Expert' },
  ];

  const placeOptions = [
    { value: 'Outside', label: 'Outside' },
    { value: 'Inside', label: 'Inside' },
  ];

  const durationOptions = [
    { value: '< 1h', label: '< 1h' },
    { value: '1h < 2h', label: '1h < 2h' },
    { value: '2h < 3h', label: '2h < 3h' },
    { value: '3h <', label: '3h <' },
  ];

  const handleSelect = (
    field: Object,
    options: Options[],
    placeholder: String
  ) => {
    return <Select {...field} options={options} placeholder={placeholder} />;
  };

  return (
    <form onSubmit={onSubmit} className="generated-activity-container">
      <br />
      <Controller
        name="Topic"
        control={control}
        render={({ field }) => handleSelect(field, topicOptions, 'Topic...')}
      />
      <br />
      <Controller
        name="KidsNumber"
        control={control}
        render={({ field }) =>
          handleSelect(field, kidsOptions, 'Number of kids...')
        }
      />
      <br />

      <Controller
        name="AgeRange"
        control={control}
        render={({ field }) =>
          handleSelect(field, ageRangeOptions, 'Age range...')
        }
      />

      <br />
      <Controller
        name="Difficulty"
        control={control}
        render={({ field }) =>
          handleSelect(field, difficultyOptions, 'Difficulty...')
        }
      />
      <br />
      <Controller
        name="Place"
        control={control}
        render={({ field }) => handleSelect(field, placeOptions, 'Place...')}
      />
      <br />
      <Controller
        name="Duration"
        control={control}
        render={({ field }) =>
          handleSelect(field, durationOptions, 'Duration...')
        }
      />
      <div className="button-box">
        <button className="button" type="submit">
          Generate
        </button>
      </div>
    </form>
  );
};

export default GenerateForm;
