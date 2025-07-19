import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShopperFeedPage from "./Pages/ShopperFeedPage/ShopperFeedPage";
import DealDetailReservePage from "./Pages/DealDetailReservePage/DealDetailReservePage";
import MyReservationsPage from "./Pages/MyReservationsPage/MyReservationsPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShopperFeedPage />} />
        <Route path="/deal/:id" element={<DealDetailReservePage />} />
        <Route path="/reservations" element={<MyReservationsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
