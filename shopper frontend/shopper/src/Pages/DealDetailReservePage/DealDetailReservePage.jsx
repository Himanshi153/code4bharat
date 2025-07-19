import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./DealDetailReservePage.css";
import deals from "../../data/deals";
import QRModal from "../../components/QRModal/QRModal";

const DealDetailReservePage = () => {
  const { id } = useParams();
  const deal = deals.find((d) => d.id === id);
  const [showQR, setShowQR] = useState(false);

  if (!deal) return <div className="deal-detail-container">Deal not found.</div>;

  return (
    <div className="deal-detail-overlay">
      <div className="deal-detail-popup">
        <img src={deal.image} alt={deal.title} className="deal-image" />
        <h2>{deal.title}</h2>
        <p className="deal-desc">{deal.description}</p>
        <p><strong>Category:</strong> {deal.category}</p>
        <p><strong>Discount:</strong> {deal.discount}</p>
        <p><strong>Expires on:</strong> {deal.expiryDate}</p>
        <p><strong>Location:</strong> {deal.location}</p>
        <button className="reserve-btn" onClick={() => setShowQR(true)}>Reserve Now</button>
        {showQR && <QRModal onClose={() => setShowQR(false)} />}
      </div>
    </div>
  );
};

export default DealDetailReservePage;
