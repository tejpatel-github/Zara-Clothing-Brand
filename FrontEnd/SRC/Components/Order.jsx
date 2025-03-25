import React, { useState, useEffect } from "react";
import axios from 'axios';
import NavigationBar from "./Navbar.jsx";
import { Button, Table, Form, Spinner, Alert } from 'react-bootstrap';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [email, setEmail] = useState(localStorage.getItem('user-email') || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reason, setReason] = useState(''); // Reason input state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/order?userEmail=${email}`);
        setOrders(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchOrders();
    }
  }, [email]);

  const handleRequestReturn = async (id) => {
    try {
      const order = orders.find(order => order._id === id);
      const returnRequested = !order.returnRequested;
      await axios.put(`http://localhost:4000/api/order/${id}/return`, {
        returnRequested,
        returnReason: order.returnReason,
      });

      setOrders(orders.map(order =>
        order._id === id ? { ...order, returnRequested, status: 'Pending' } : order
      ));
    } catch (err) {
      setError(err.message || 'Failed to update return request.');
    }
  };

  const handleReasonChange = (e) => {
    setReason(e.target.value); // Update reason state
  };

  const handleSubmitReturn = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/order/${id}/return`, {
        returnRequested: true,
        returnReason: reason, // Submit reason
      });

      setOrders(orders.map(order =>
        order._id === id ? { ...order, returnReason: reason } : order
      ));
      setReason(''); // Clear the input after submission
    } catch (err) {
      setError(err.message || 'Failed to submit return reason.');
    }
  };

  if (!email) {
    return (
      <div className="container mt-5">
        <h2 className="text-center mb-4">Order Page</h2>
        <Alert variant="warning" className="text-center">
          Please login to view your orders.
        </Alert>
      </div>
    );
  }

  if (loading) return (
    <div className="container mt-5 text-center">
      <Spinner animation="border" variant="primary" />
    </div>
  );

  if (error) return (
    <div className="container mt-5">
      <Alert variant="danger" className="text-center">
        Error: {error}
      </Alert>
    </div>
  );

  return (
    <>
      <NavigationBar />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Your Orders</h2>
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Status</th>
                <th>Return Requested</th>
                <th>Request for Return</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map(order => (
                  <React.Fragment key={order._id}>
                    <tr>
                      <td>{order.items.map(item => `${item.productName}, Quantity: ${item.quantity}`).join(', ')}</td>
                      <td>${order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)}</td>
                      <td>{order.status}</td>
                      <td>{order.returnRequested ? "Return Pending" : "Not Requested"}</td>
                      <td>
                        <Button
                          variant={order.returnRequested ? "secondary" : "primary"}
                          size="sm"
                          onClick={() => handleRequestReturn(order._id)}
                        >
                          {order.returnRequested ? "Request for Return" : "Request Return"}
                        </Button>
                      </td>
                    </tr>
                    {order.returnRequested && (
                      <tr>
                        <td colSpan="4">
                          <Form>
                            <Form.Group controlId={`reason-${order._id}`}>
                              <Form.Label>Reason for Return:</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter reason for return"
                                value={reason} // Bind value to reason state
                                onChange={handleReasonChange} // Update reason on input change
                              />
                            </Form.Group>
                            <Button
                              variant="success"
                              size="sm"
                              className="mt-5px"
                              onClick={() => handleSubmitReturn(order._id)}
                            >
                              Submit Return Reason
                            </Button>
                          </Form>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">No orders found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Order;
