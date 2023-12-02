import classNames from 'classnames';
import { IoCloseOutline } from 'react-icons/io5';

import './Modal.css';

const primaryColor = '#006d77';

type Props = {
  content: string;
  btnText?: {
    confirm?: string;
    cancel?: string;
  };
  onConfirm?: Function;
  onCancel?: Function;
  onClose?: Function;
  isForm?: boolean;
  formName?: string;
};

const Modal = ({
  content,
  btnText,
  onConfirm,
  onCancel,
  onClose,
  isForm = false,
  formName,
}: Props) => {
  const confirm = btnText?.confirm || 'Yess';
  const cancel = btnText?.cancel || 'Cancel';

  const modalClasses = classNames('modal-container');

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    return;
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    return;
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    return;
  };

  return (
    <div className={modalClasses}>
      <div className="modal">
        <button className="btn-close" onClick={handleClose}>
          <IoCloseOutline size={22} color={primaryColor} />
        </button>
        <div className="modal-content">
          <p>{content}</p>
        </div>
        <div className="modal-btns">
          <button className="modal-btn" type="button" onClick={handleCancel}>
            {cancel}
          </button>
          <button
            className="modal-btn"
            type={isForm ? 'submit' : 'button'}
            form={isForm ? formName : ''}
            onClick={handleConfirm}
          >
            {confirm}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
