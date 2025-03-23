import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';
import axios from 'axios';
import AdminNav from "./AdminNav.jsx";

const AdminDashboard = () => {
  

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
                  <h3>{totalUsers || 0}</h3>
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
