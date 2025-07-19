import React from 'react';
import './DealCard.css';

const DealCard = ({ title, expiry, discount }) => {
  return (
    <div className="deal-card">
      <h3>{title}</h3>
      <p>Expires in: {expiry}</p>
      <p>Discount: {discount}</p>
      <button>View Deal</button>
    </div>
  );
};

export default DealCard;
