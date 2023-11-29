import { Option } from '../../types/activity';

import './FilterTag.css';

const FilterTag = ({ label, value }: Option) => {
  let text = value;

  if (label === 'numOfKids') {
    if (value === '1') {
      text = `${value} kid`;
    } else {
      text = `${value} kids`;
    }
  }

  return <span className="filter-tag">{text}</span>;
};

export default FilterTag;
