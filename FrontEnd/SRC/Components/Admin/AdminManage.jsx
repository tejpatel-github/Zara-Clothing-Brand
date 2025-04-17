import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNav from "./AdminNav.jsx";

function AdminManage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://zara-clothing-brand-backend.onrender.com/api/orders");
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("There was an error fetching the orders!", error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (e, orderId) => {
    const updatedStatus = e.target.value;
    const updatedOrders = orders.map((order) => {
      if (order._id === orderId) {
        return { ...order, status: updatedStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
    try {
      await axios.put(`https://zara-clothing-brand-backend.onrender.com/api/orders/${orderId}`, { status: updatedStatus });
      alert("Update successfully");
    } catch (error) {
      console.error("There was an error updating the order status!", error);
    }
  };

  return (
    <>
      <AdminNav />
      <div className="container mt-4">
        <h2 className="mb-4 text-center text-md-start">Admin - Orders Management</h2>
        
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.name}</td>
                  <td>
  <select
    className="form-select status-select"
    value={order.status}
    onChange={(e) => handleStatusChange(e, order._id)}
  >
    <option value="Pending">Pending</option>
    <option value="Processing">Processing</option>
    <option value="Shipped">Shipped</option>
    <option value="Delivered">Delivered</option>
    <option value="Return Processing">Return Processing</option>
    <option value="Cancelled">Cancelled</option>
  </select>
</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => alert("Order updated successfully!")}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default AdminManage;
