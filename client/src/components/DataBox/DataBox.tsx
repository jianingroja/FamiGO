import './DataBox.css';

type Props = {
  type: string;
  number: number;
};
const DataBox = ({ type, number }: Props) => {
  return (
    <div className="data">
      <p className="number">{number}</p>
      <p className="type">{type}</p>
    </div>
  );
};
export default DataBox;
