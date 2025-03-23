import React, { useState, useEffect } from 'react';
import NavigationBar from './Navbar.jsx';
import { Container, Button, Form, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Buffer } from 'buffer';
import empty from '../Assets/empty.jpg';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const checkLogin = () => {
    const storedEmail = localStorage.getItem('user-email');
    if (!storedEmail) {
      alert("Please log in first.");
      navigate('/login');
      return false;
    }
    setUserEmail(storedEmail);
    return true;
  };

  useEffect(() => {
    if (!checkLogin()) return;

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/cart?email=${userEmail}`);
        setCartItems(response.data);
      } catch (error) {
        console.error("There was an error fetching the cart items!", error.response || error.message);
        setError("Failed to fetch cart items");
      }
    };

    fetchCartItems();
  }, [userEmail]);

  const handleQuantityChange = async (item, quantity) => {
    if (!checkLogin() || quantity < 1) return;
    try {
      const updatedItem = { ...item, quantity };
      await axios.put(`http://localhost:4000/api/cart/${item._id}`, updatedItem);
      setCartItems(cartItems.map(cartItem => cartItem._id === item._id ? updatedItem : cartItem));
    } catch (error) {
      console.error("There was an error updating the cart item!", error.response || error.message);
      setError("Failed to update cart item");
    }
  };

  const handleRemoveItem = async (item) => {
    if (!checkLogin()) return;
    try {
      await axios.delete(`http://localhost:4000/api/cart/${item._id}`);
      setCartItems(cartItems.filter(cartItem => cartItem._id !== item._id));
    } catch (error) {
      console.error("There was an error removing the cart item!", error.response || error.message);
      setError("Failed to remove cart item");
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const calculateTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = () => {
    if (!checkLogin()) return;
    navigate('/checkout', { state: { cartItems, totalPrice: calculateTotalPrice(), totalItems: calculateTotalItems() } });
  };

  return (
    <>
      <NavigationBar />
      <Container className="mt-4">
        <h2 className="text-center mb-4">🛒 Your Shopping Cart</h2>
        {error && <Alert variant="danger" className="text-center">{error}</Alert>}
        {cartItems.length === 0 ? (
          <div className="empty-cart text-center mt-5">
            <img src={empty} alt="Cart is empty" className="empty-cart-image" style={{ maxWidth: '200px', opacity: '0.7' }} />
            <h3 className="mt-3">Your Cart is Empty!</h3>
            <p>Browse products and add them to your cart.</p>
          </div>
        ) : (
          <Row>
            {cartItems.map(item => (
              <Col xs={12} md={6} lg={4} key={item._id} className="mb-4">
                <Card className="h-100 shadow-lg border-0">
                  <Card.Img
                    variant="top"
                    src={item.image ? `data:${item.imageType};base64,${Buffer.from(item.image).toString('base64')}` : empty}
                    alt={item.name}
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text className="text-success fw-bold">Price: ${item.price}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="px-3"
                          onClick={() => handleQuantityChange(item, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <Form.Control
                          type="number"
                          value={item.quantity}
                          readOnly
                          className="mx-2 text-center"
                          style={{ width: '60px' }}
                        />
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="px-3"
                          onClick={() => handleQuantityChange(item, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveItem(item)}
                      >
                        🗑️ Remove
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
            <Col xs={12} className="mt-4">
              <Card className="cart-summary text-white bg-dark border-0 shadow-lg">
                <Card.Body>
                  <h4 className="text-center">Cart Summary</h4>
                  <p className="text-center">Total Items: {calculateTotalItems()}</p>
                  <p className="text-center">Total Price: ${calculateTotalPrice()}</p>
                  <Button variant="success" size="lg" block onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default Cart;
