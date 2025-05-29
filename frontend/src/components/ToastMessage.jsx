import React from "react";
import "./ToastMessage.css";

export default function ToastMessage({ message, placement, onClose }) {
  if (!message?.header) return null;

  return (
    <>
      <div className="toast-backdrop d-flex justify-content-center" onClick={onClose}></div>
      <div className="toast-container">
        <div className="mb-3 pb-1">
        <h4>{message.header}</h4>
        </div>
        <div className="mb-3">
        <p>{message.content}</p>
        </div>
        <button className="toast-close-btn" onClick={onClose}>Close</button>
      </div>
    </>
  );
}
