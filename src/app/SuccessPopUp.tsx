import React, { useState, useEffect } from 'react';
import '../app/style.scss'
interface SuccessPopUpProps { 
    show: boolean;
    onClose: () => void;
}
const SuccessPopup = ({ show, onClose } : SuccessPopUpProps) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    if (show) {
      const timerId = setTimeout(() => {
        onClose();
      }, 4000);

      return () => clearTimeout(timerId);
    }
  }, [show, onClose]);

  const handleClose = () => {
    setVisible(!visible);
    onClose();
  };

  return (
    <div className={`success-popup ${visible ? 'visible' : ''}`}>
      <div className="popup-content">
        <p>Sudoku successfully resolved</p>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default SuccessPopup;
