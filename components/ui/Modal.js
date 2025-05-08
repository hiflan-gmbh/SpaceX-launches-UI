'use client';

import styles from '@/styles/Modal.module.css';

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modal_overlay} onClick={onClose} data-testid="modal">
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close_button} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
