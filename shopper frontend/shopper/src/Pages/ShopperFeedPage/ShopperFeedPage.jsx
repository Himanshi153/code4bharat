import React from "react";
import "./ShopperFeedPage.css";
import deals from "../../data/deals";
import { Link } from "react-router-dom";

const ShopperFeedPage = () => {
  return (
    <div className="shopper-feed">
      <h1>Nearby Flash Deals</h1>
      <div className="deal-list">
        {deals.map((deal) => (
          <div key={deal.id} className="deal-card">
            <img src={deal.image} alt={deal.title} />
            <h2>{deal.title}</h2>
            <p>{deal.description}</p>
            <p>Category: {deal.category}</p>
            <p>Discount: {deal.discount}</p>
            <p>Expires: {deal.expiryDate}</p>
            <p>Location: {deal.location}</p>
            <Link to={`/deal/${deal.id}`} className="view-btn">
              View Deal
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopperFeedPage;
