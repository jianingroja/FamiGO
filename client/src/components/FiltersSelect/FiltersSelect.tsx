import Select from 'react-select';
import { Controller } from 'react-hook-form';

import { filterGroups } from '../../utils/mock/filters';

type Props = {
  control: any;
};

const FiltersSelect = ({ control }: Props) => {
  return (
    <div className="filter-container">
      {filterGroups.map((group, index) => {
        const { name, placeholder, options } = group;

        return (
          <Controller
            key={index}
            name={name}
            control={control}
            render={({ field }) => (
              <Select {...field} placeholder={placeholder} options={options} />
            )}
          />
        );
      })}
    </div>
  );
};

export default FiltersSelect;
