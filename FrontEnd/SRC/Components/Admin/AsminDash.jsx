import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import axios from 'axios';
import AdminNav from "./AdminNav.jsx";

const AdminDashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalReturns, setTotalReturns] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [recentOrders, setRecentOrders] = useState([]);

  const [orders, setOrders] = useState([]);

  // Fetch orders from the server
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/orders'); 
        console.log(response.data); 
        setOrders(response.data);
      } catch (error) {
        console.error("There was an error fetching the orders!", error);
      }
    };

    fetchOrders();
  }, []);

  // Handle status change and update the server
  const handleStatusChange = async (e, orderId) => {
    const updatedStatus = e.target.value;
    const updatedOrders = orders.map(order => {
      if (order._id === orderId) {
        return { ...order, status: updatedStatus };
      }
      return order;
    });
    setOrders(updatedOrders);
    try {
      await axios.put(`http://localhost:4000/api/orders/${orderId}`, { status: updatedStatus });
      alert("Update successfully");
    } catch (error) {
      console.error("There was an error updating the order status!", error);
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const revenueResponse = await fetch('http://localhost:4000/api/total-revenue');
        const revenueData = await revenueResponse.json();
        setTotalRevenue(revenueData.totalRevenue);

        const ordersResponse = await fetch('http://localhost:4000/api/total-orders');
        const ordersData = await ordersResponse.json();
        setTotalOrders(ordersData.totalOrders);

        const returnsResponse = await fetch('http://localhost:4000/api/total-returns');
        const returnsData = await returnsResponse.json();
        setTotalReturns(returnsData.totalReturns);

        const usersResponse = await fetch('http://localhost:4000/api/total-users');
        const usersData = await usersResponse.json();
        setTotalUsers(usersData.totalUsers);

        const recentOrdersResponse = await fetch('http://localhost:4000/api/orders');
        const recentOrdersData = await recentOrdersResponse.json();
        setRecentOrders(recentOrdersData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
    <AdminNav/>
    <Container fluid>
      <Row>
        <Col md={12} className='p-4'>
          <h3 className='text-center mb-4'>Admin Dashboard</h3>
          <Row className='g-4'>
            <Col md={3}>
              <Card className='shadow'>
                <Card.Body>
                  <h5>Total Orders</h5>
                  <h3>{totalOrders || 0}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className='shadow'>
                <Card.Body>
                  <h5>Total Revenue</h5>
                  <h3>${totalRevenue || 0}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className='shadow'>
                <Card.Body>
                  <h5>Total Returns</h5>
                  <h3>{totalReturns || 0}</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className='shadow'>
                <Card.Body>
                  <h5>Total Users</h5>
                  <h3>{totalUsers}</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Card className='shadow mt-4'>
            <Card.Body>
              <h5>Recent Orders</h5>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{order.name}</td>
                        <td>{order.items.map(item => item.productName).join(", ")}</td>
                        <td>${order.totalPrice}</td>
                        <td>{order.totalItems}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No recent orders found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default AdminDashboard;
