import { GenerateFormProps } from '../../types/activity';
import FiltersSelect from '../FiltersSelect/FiltersSelect';
import './GenerateForm.css';

const GenerateForm: React.FC<GenerateFormProps> = ({ control, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="generated-activity-container">
      <FiltersSelect control={control} />
      <div className="button-box">
        <button className="button" type="submit">
          Generate
        </button>
      </div>
    </form>
  );
};

export default GenerateForm;
