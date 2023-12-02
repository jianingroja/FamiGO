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
  isForm?: boolean;
  formName?: string;
};

const Modal = ({
  content,
  btnText,
  onConfirm,
  onCancel,
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

  return (
    <div className={modalClasses}>
      <div className="modal">
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
