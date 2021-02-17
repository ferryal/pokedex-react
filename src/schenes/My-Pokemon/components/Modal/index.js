import React from 'react';
import styles from './styles.module.scss';

const Modal = (props) => {
  const { show, setShow } = props;

  return show ? (
    <div className={styles.modalWrapper}>
      <div onClick={() => setShow(false)} className={styles.modalBackdrop} />
      <div className={styles.modalBox}>{props.children}</div>
    </div>
  ) : null;
};
export default Modal;
