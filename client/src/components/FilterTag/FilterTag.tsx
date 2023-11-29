import './FilterTag.css';

type Props = {
  value: string;
};

const FilterTag = ({ value }: Props) => {
  return <span>{value}</span>;
};

export default FilterTag;
