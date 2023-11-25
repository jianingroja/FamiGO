import Logo from '../../assets/logo.png';
import './Collection.css';

const tempUrl = Logo;

type Props = {
  type: string;
};

const Collection = ({ type }: Props) => {
  // todo: extract component for pre-view
  if (type === 'ai') {
    return (
      <div className="collection-ai">
        <div className="pre-view">
          <h3>title</h3>
          <p>do you want to build a snow man?</p>
          <p>duration: 1 hour </p>
        </div>
        <div className="pre-view">
          <h3>title</h3>
          <p>do you want to build a fire man?</p>
          <p>duration: 2 hour </p>
        </div>
      </div>
    );
  }

  return (
    <div className="collection">
      <div className="pre-view">
        <img src={tempUrl} alt="activity pre view" />
      </div>
      <div className="pre-view">
        <img src={tempUrl} alt="activity pre view" />
      </div>
      <div className="pre-view">
        <img src={tempUrl} alt="activity pre view" />
      </div>
      <div className="pre-view">
        <img src={tempUrl} alt="activity pre view" />
      </div>
    </div>
  );
};
export default Collection;
