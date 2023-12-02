import { useState } from 'react';
import classNames from 'classnames';

import './Modal.css';

type Props = {
  content: string;
  btnText?: {
    confirm?: string;
    cancel?: string;
  };
  onConfirm?: Function;
  onCancel?: Function;
};

const Modal = ({ content, btnText, onConfirm, onCancel }: Props) => {
  const [hidden, setHidden] = useState(false);

  const confirm = btnText?.confirm || 'Yess';
  const cancel = btnText?.cancel || 'Cancel';

  const modalClasses = classNames('modal-container', {
    hidden,
  });

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }

    setHidden(true);
    return;
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setHidden(true);
    return;
  };

  return (
    <div className={modalClasses}>
      <div className="modal">
        <div className="modal-content">
          <p>{content}</p>
        </div>
        <div className="modal-btns">
          <button className="modal-btn" onClick={handleCancel}>
            {cancel}
          </button>
          <button className="modal-btn" onClick={handleConfirm}>
            {confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
