import React, { useState } from "react";
import "./SurplusPredictionPage.css";

export default function SurplusPredictionPage() {
 
  const approvedDealsInitial = [
    {
      name: "Milk",
      category: "Dairy",
      quantity: 10,
      expiry: "2025-07-20",
      probabilityToSell: 60,
      discount: 20,
      basePrice: 50,
      donationPartner: null,
    },
    {
      name: "Yogurt",
      category: "Dairy",
      quantity: 8,
      expiry: "2025-07-20",
      probabilityToSell: 50,
      discount: 30,
      basePrice: 40,
      donationPartner: null,
    },
    {
      name: "Lettuce",
      category: "Vegetables",
      quantity: 5,
      expiry: "2025-07-19",
      probabilityToSell: 40,
      discount: 40,
      basePrice: 30,
      donationPartner: {
        name: "Local Shelter",
        pickupTime: "2025-07-19 09:00 AM",
      },
    },
    {
      name: "Bread",
      category: "Bakery",
      quantity: 6,
      expiry: "2025-07-19",
      probabilityToSell: 30,
      discount: 50,
      basePrice: 20,
      donationPartner: {
        name: "City Food Bank",
        pickupTime: "2025-07-18 08:00 AM",
      },
    },
    {
      name: "Cheese",
      category: "Dairy",
      quantity: 5,
      expiry: "2025-07-20",
      probabilityToSell: 70,
      discount: 10,
      basePrice: 60,
      donationPartner: null,
    },
  ];


  const surplusPendingInitial = [
    {
      id: 201,
      name: "Lettuce",
      quantity: 5,
      expiry: "2025-07-19",
      probabilityToSell: 45,
      discount: 40,
      basePrice: 25,
    },
  ];

  const [predictions, setPredictions] = useState(surplusPendingInitial);
  const [approvedDeals, setApprovedDeals] = useState(approvedDealsInitial);

  const handleDiscountChange = (id, value) => {
    const updated = predictions.map((item) =>
      item.id === id ? { ...item, discount: Number(value) } : item
    );
    setPredictions(updated);
  };

  const handleApprove = (item) => {
    if (!approvedDeals.find((deal) => deal.id === item.id)) {
      setApprovedDeals([...approvedDeals, item]);
      setPredictions(predictions.filter((p) => p.id !== item.id)); 
    }
  };

  const totalDiscounted = approvedDeals.length;
  const expectedWasteSaved = approvedDeals.reduce(
    (sum, deal) => sum + deal.quantity,
    0
  );

  return (
    <div className="surplus-page">
      {/* <h1 className="heading_main">Surplus Approvals & Flash Deals</h1> */}
      <div class="heading_main">
  <h1>Surplus Approvals & Flash Deals</h1>
</div>


      <section className="surplus-section">
        <h2>Predicted Surplus Needing Approval</h2>
        {predictions.length === 0 ? (
          <p>All surplus approved!</p>
        ) : (
          predictions.map((item) => (
            <div className="surplus-item" key={item.id}>
              <div className="surplus-details">
                <p>
                  <strong>{item.name}</strong> — {item.quantity} units — Expires on {item.expiry}
                </p>
                <p>Probability to Sell: {item.probabilityToSell}%</p>
                <p>Suggested Discount: {item.discount}%</p>
              </div>
              <div className="surplus-actions">
                <label>
                  Adjust Discount:
                  <input
                    type="number"
                    min="0"
                    max="90"
                    value={item.discount}
                    onChange={(e) =>
                      handleDiscountChange(item.id, e.target.value)
                    }
                  />
                  %
                </label>
                <button onClick={() => handleApprove(item)}>
                  Approve Discount
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      <section className="surplus-section">
        <h2>Approved Flash Deals</h2>
        {approvedDeals.length === 0 ? (
          <p className="empty-msg">No deals approved yet.</p>
        ) : (
          <div className="deals-grid">
            {approvedDeals.map((deal) => (
              <div className="deal-card" key={deal.id}>
                <h3>{deal.name}</h3>
                <p>Discount: {deal.discount}%</p>
                <p>
                  New Price: ₹
                  {(deal.basePrice *
                    (1 - deal.discount / 100)).toFixed(2)}
                </p>
                <p>Available: {deal.quantity} units</p>
                <p>Expiry: {deal.expiry}</p>
                <button> Edit </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="surplus-summary">
        <h3>Summary</h3>
        <p>Total Items Discounted: {totalDiscounted}</p>
        <p>Expected Waste Saved: {expectedWasteSaved} units</p>
      </section>
    </div>
  );
}