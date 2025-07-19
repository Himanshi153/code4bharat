import React, { useState } from "react";
import "./MyReservationsPage.css";
import QRModal from "../../components/QRModal/QRModal";

const dummyReservations = [
  {
    id: 1,
    name: "Fresh Bread Pack",
    pickupTime: "Today 5:00 PM - 7:00 PM",
    location: "Sunrise Grocery Store, Sector 21",
  },
  {
    id: 2,
    name: "Fruit Box",
    pickupTime: "Tomorrow 10:00 AM - 12:00 PM",
    location: "Nature's Basket, HSR Layout",
  },
];

const MyReservationsPage = () => {
  const [selectedDealId, setSelectedDealId] = useState(null);

  const handleShowQR = (id) => {
    setSelectedDealId(id);
  };

  const handleCloseQR = () => {
    setSelectedDealId(null);
  };

  return (
    <div className="my-reservations-container">
      <h1 className="my-reservations-heading">My Reservations</h1>
      <div className="reservations-list">
        {dummyReservations.map((reservation) => (
          <div className="reservation-card" key={reservation.id}>
            <h3>{reservation.name}</h3>
            <p><strong>Pickup Time:</strong> {reservation.pickupTime}</p>
            <p><strong>Location:</strong> {reservation.location}</p>
            <button className="show-qr-button" onClick={() => handleShowQR(reservation.id)}>
              Show QR
            </button>
          </div>
        ))}
      </div>
      {selectedDealId !== null && (
        <QRModal dealId={selectedDealId} onClose={handleCloseQR} />
      )}
    </div>
  );
};

export default MyReservationsPage;
