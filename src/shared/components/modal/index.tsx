import "./styles.css";

import React from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
