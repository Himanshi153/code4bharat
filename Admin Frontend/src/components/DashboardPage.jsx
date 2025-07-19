import React from 'react';
import './DashboardPage.css'; 
import { useNavigate } from "react-router-dom";

const StoreDashboard = () => {
  const navigate = useNavigate();
  const storeName = 'Green Grocery';
  const totalItemsInStock = 100;
  const itemsExpiringSoon = 10;
  const surplusPredicted = 6;
  const surplusRescued = { weight: 90, meals: 30 };
 const topExpiringItems = [
  { 
    name: 'Milk', 
    quantity: 10, 
    expiryDate: '2025-07-20', 
    probabilityToSell: 60, 
    discount: 20,
    donationPartner: null 
  },
  { 
    name: 'Yogurt', 
    quantity: 8, 
    expiryDate: '2025-07-20', 
    probabilityToSell: 50, 
    discount: 30,
    donationPartner: null 
  },
  { 
    name: 'Lettuce', 
    quantity: 5, 
    expiryDate: '2025-07-19', 
    probabilityToSell: 40, 
    discount: 40,
    donationPartner: {
      name: 'Local Shelter',
      pickupTime: '2025-07-19 09:00 AM'
    }
  },
  { 
    name: 'Bread', 
    quantity: 6, 
    expiryDate: '2025-07-19', 
    probabilityToSell: 30, 
    discount: 50,
    donationPartner: {
      name: 'City Food Bank',
      pickupTime: '2025-07-18 08:00 AM'
    }
  },
  { 
    name: 'Cheese', 
    quantity: 5, 
    expiryDate: '2025-07-20', 
    probabilityToSell: 70, 
    discount: 10,
    donationPartner: null 
  },
];


  return (
    <div className="dashboard">
      <h1 className="dashboard__header">Welcome, {storeName}</h1>

      <div className="dashboard__summary">
        <h2>Summary</h2>
        <ul>
          <li>Total Items In Stock: {totalItemsInStock}</li>
          <li>Items Expiring Soon (next 3 days): {itemsExpiringSoon}</li>
          <li>Surplus Predicted: {surplusPredicted}</li>
          <li>
            Surplus Rescued This Month: {surplusRescued.weight} kg, {surplusRescued.meals} meals donated
          </li>
        </ul>
      </div>

      <div className="dashboard__table">
        <h2>Top 5 Items Expiring Soon</h2>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Expiry Date</th>
               <th>Probability to Sell</th>
    <th>Discount (%)</th>
    <th>Donation Partner</th>
            </tr>
          </thead>
          <tbody>
          {topExpiringItems.map((item, index) => (
            <tr key={index}>
              <td data-label="Item Name">{item.name}</td>
              <td data-label="Quantity">{item.quantity}</td>
              <td data-label="Expiry Date">{item.expiryDate}</td>
              <td data-label="Probability">{item.probabilityToSell}%</td>
              <td data-label="Discount">{item.discount}%</td>
              <td data-label="Donation">
                {item.donationPartner 
                  ? `${item.donationPartner.name} @ ${item.donationPartner.pickupTime}` 
                  : '—'}
              </td>
            </tr>
          ))}
        </tbody>


        </table>
      </div>

      <div className="dashboard__actions">
         <button onClick={() => navigate("/manage-stock")}>
        Manage Stock
      </button>
        <button onClick={() => window.location.href = '/surplus-predictions'}>View Surplus Predictions</button>
        <button onClick={() => window.location.href = '/impact-dashboard'}>View Impact Dashboard</button>
        <button onClick={() => window.location.href = '/impact-dashboard'}>History</button>
      </div>
    </div>
  );
};

export default StoreDashboard;
