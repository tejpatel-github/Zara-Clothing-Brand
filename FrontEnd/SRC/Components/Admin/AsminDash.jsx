import React from "react";
import { Container, Row, Col, Card, Table } from "react-bootstrap";

const AdminDashboard = () => {
  return (
    <Container fluid>
      <Row>
        <Col md={10} className="p-4">
          <h3>Dashboard</h3>
          <Row>
            <Col md={4}>
              <Card className="mb-3 shadow">
                <Card.Body>
                  <h5>Total Orders</h5>
                  <h3>1,234</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-3 shadow">
                <Card.Body>
                  <h5>Total Revenue</h5>
                  <h3>$56,789</h3>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="mb-3 shadow">
                <Card.Body>
                  <h5>Users</h5>
                  <h3>5,678</h3>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Orders Table */}
          <Card className="shadow">
            <Card.Body>
              <h5>Recent Orders</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Tirth</td>
                    <td>Hoodie</td>
                    <td>$45</td>
                    <td>Shipped</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Tej</td>
                    <td>Jacket</td>
                    <td>$85</td>
                    <td>Processing</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>Rohit</td>
                    <td>T-Shirt</td>
                    <td>$25</td>
                    <td>Delivered</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
