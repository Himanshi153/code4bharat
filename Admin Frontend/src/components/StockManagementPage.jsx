import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./StockManagementPage.css";

export default function StockAdminPage() {
  const navigate = useNavigate(); 

  const [stock, setStock] = useState([
    {
      name: "Milk",
      category: "Dairy",
      quantity: 10,
      expiry: "2025-07-20",
      probabilityToSell: 60,
      discount: 20,
      donationPartner: null,
      approved: false,
    },
    {
      name: "Yogurt",
      category: "Dairy",
      quantity: 8,
      expiry: "2025-07-20",
      probabilityToSell: 50,
      discount: 30,
      donationPartner: null,
      approved: true,
    },
    {
      name: "Lettuce",
      category: "Vegetables",
      quantity: 5,
      expiry: "2025-07-19",
      probabilityToSell: 40,
      discount: 40,
      donationPartner: {
        name: "Local Shelter",
        pickupTime: "2025-07-19 09:00 AM",
      },
      approved: true,
    },
    {
      name: "Bread",
      category: "Bakery",
      quantity: 6,
      expiry: "2025-07-19",
      probabilityToSell: 30,
      discount: 50,
      donationPartner: {
        name: "City Food Bank",
        pickupTime: "2025-07-18 08:00 AM",
      },
      approved: true,
    },
    {
      name: "Cheese",
      category: "Dairy",
      quantity: 5,
      expiry: "2025-07-20",
      probabilityToSell: 70,
      discount: 10,
      donationPartner: null,
      approved: true,
    },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: "",
    expiry: "",
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingItem, setEditingItem] = useState({});

  const handleChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItem.name || !newItem.quantity || !newItem.expiry) return;

    const addedItem = {
      ...newItem,
      probabilityToSell: 50,
      discount: 20,
      donationPartner: null,
      approved: false, 
    };

    setStock([addedItem, ...stock]);
    setNewItem({ name: "", category: "", quantity: "", expiry: "" });
  };

  const handleDelete = (index) => {
    const updated = [...stock];
    updated.splice(index, 1);
    setStock(updated);
  };

  const handleEditStart = (index) => {
    setEditingIndex(index);
    setEditingItem(stock[index]);
  };

  const handleEditChange = (e) => {
    setEditingItem({ ...editingItem, [e.target.name]: e.target.value });
  };

  const handleEditSave = (index) => {
    const updated = [...stock];
    updated[index] = editingItem;
    setStock(updated);
    setEditingIndex(null);
    setEditingItem({});
  };

  const handleClearAll = () => {
    setStock([]);
  };

  const handleApprove = (index) => {
    const updated = [...stock];
    updated[index].approved = true;
    setStock(updated);

    navigate("/approve"); 
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Green Grocery</h1>
      </header>

      <section className="admin-section">
        <h2>Add New Stock Item</h2>
        <form className="admin-form" onSubmit={handleAdd}>
          <div className="form-row">
            <div className="form-group">
              <label>Item Name</label>
              <input
                type="text"
                name="name"
                value={newItem.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={newItem.category}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                value={newItem.quantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="date"
                name="expiry"
                value={newItem.expiry}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="primary-btn">
            Add Item
          </button>
        </form>

        <div className="bulk-clear">
          <label className="bulk-upload">
            Bulk Upload CSV:
            <input type="file" />
          </label>
          <button onClick={handleClearAll} className="danger-btn">
            Clear All
          </button>
        </div>
      </section>

      <section className="admin-section">
        <h2>Current Stock</h2>
        {stock.length === 0 ? (
          <p className="empty-msg">No stock items yet. Add some!</p>
        ) : (
          <div className="table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Expiry</th>
                  <th>Probability to Sell</th>
                  <th>Suggested Discount (%)</th>
                  <th>Suggested Donation</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {stock.map((item, index) => (
                  <tr key={index}>
                    {editingIndex === index ? (
                      <>
                        <td>
                          <input
                            name="name"
                            value={editingItem.name}
                            onChange={handleEditChange}
                          />
                        </td>
                        <td>
                          <input
                            name="category"
                            value={editingItem.category}
                            onChange={handleEditChange}
                          />
                        </td>
                        <td>
                          <input
                            name="quantity"
                            type="number"
                            value={editingItem.quantity}
                            onChange={handleEditChange}
                          />
                        </td>
                        <td>
                          <input
                            name="expiry"
                            type="date"
                            value={editingItem.expiry}
                            onChange={handleEditChange}
                          />
                        </td>
                        <td colSpan="4">
                          <button
                            onClick={() => handleEditSave(index)}
                            className="primary-btn"
                          >
                            Save
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>{item.quantity}</td>
                        <td>{item.expiry}</td>
                        <td>{item.probabilityToSell}%</td>
                        <td>{item.discount}%</td>
                        <td>
                          {item.donationPartner
                            ? `${item.donationPartner.name} @ ${item.donationPartner.pickupTime}`
                            : "—"}
                        </td>
                        <td>
                          <button
                            onClick={() => handleEditStart(index)}
                            className="small-btn"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="small-btn danger-btn"
                          >
                            Delete
                          </button>
                          {item.approved ? (
                            <span className="approved-label">Approved</span>
                          ) : (
                            <button
                              onClick={() => handleApprove(index)}
                              className="small-btn success-btn"
                            >
                              Approve
                            </button>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
