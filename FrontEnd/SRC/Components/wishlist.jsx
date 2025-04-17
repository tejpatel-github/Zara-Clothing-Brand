import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Image, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Buffer } from 'buffer';
import NavigationBar from './Navbar.jsx';
import Footer from './footer.jsx';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      const storedEmail = localStorage.getItem('user-email');
      if (!storedEmail) {
        setError("User not logged in");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:4000/api/wishlist`, {
          params: { email: storedEmail }
        });

        if (Array.isArray(response.data)) {
          setWishlistItems(response.data);
        } else {
          console.error("Response data is not an array:", response.data);
          setError("Unexpected response format");
        }
      } catch (error) {
        console.error("There was an error fetching the wishlist items!", error);
        setError("Failed to fetch wishlist items");
      }
    };

    fetchWishlistItems();
  }, []);

  const handleRemoveFromWishlist = async (itemId) => {
    try {
      await axios.delete(`http://localhost:4000/api/wishlist/${itemId}`);
      setWishlistItems(wishlistItems.filter(item => item._id !== itemId));
      alert("Item removed from wishlist!");
    } catch (error) {
      console.error("There was an error removing the item from the wishlist!", error);
      setError("Failed to remove item from wishlist");
    }
  };

  const handleMoveToCart = async (item) => {
    const storedEmail = localStorage.getItem('user-email');
    if (!storedEmail) {
      setError("User not logged in");
      return;
    }

    const cartItem = {
      email: storedEmail,
      productId: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      image: item.image,
      imageType: item.imageType,
    };

    try {
      await axios.post('http://localhost:4000/api/cart', cartItem);
      alert('Item moved to cart successfully!');
      handleRemoveFromWishlist(item._id);
    } catch (error) {
      console.error("There was an error moving the item to the cart!", error);
      setError("Failed to move item to cart");
    }
  };

  return (
    <>
      <NavigationBar />
      <Container className="mt-4" style={{height: "75vh"}}>
        {error && <Alert variant="danger">{error}</Alert>}
        <h2 className="text-center mb-4">My Wishlist</h2>

        {wishlistItems.length === 0 ? (
          <Alert variant="info" className="text-center">
            Your wishlist is empty! Browse products and add them to your wishlist.
          </Alert>
        ) : (
          <Row className="g-4">
            {wishlistItems.map(item => (
              <Col xs={12} md={6} lg={4} key={item._id}>
                <Card className="h-100 shadow-sm">
                  <Image
                    variant="top"
                    src={`data:${item.imageType};base64,${Buffer.from(item.image).toString('base64')}`}
                    alt={item.name}
                    rounded
                    style={{ width: '100%', height: '250px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Price: ${item.price}</Card.Text>
                    <Card.Text>Size: {item.size}</Card.Text>
                    <Card.Text>Quantity: {item.quantity}</Card.Text>
                    <div className="d-flex justify-content-between">
                      <Button
                        variant="primary"
                        onClick={() => handleMoveToCart(item)}
                      >
                        Move to Cart
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveFromWishlist(item._id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
      <Footer/>
    </>
  );
}

export default Wishlist;
