import React from "react";
import "./QRModal.css";

const QRModal = ({ onClose }) => {
  return (
    <div className="qr-modal-overlay">
      <div className="qr-modal-content">
        <h2>Your Reservation QR Code</h2>
        <img src="https://api.qrserver.com/v1/create-qr-code/?data=deal123&size=200x200" alt="QR Code" />
        <p>Show this at the store to pick up your reserved item.</p>
        <button className="qr-modal-close" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default QRModal;
