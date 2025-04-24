import React, { useState, useEffect } from "react";
import NavigationBar from "./Navbar.jsx";
import { Container, Row, Col, Form, FormControl, Button, Card, Modal, Dropdown, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Buffer } from "buffer";
import Footer from "./footer.jsx";

function Store() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(true); // Loader state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://zara-clothing-brand-backend.onrender.com/api/items");
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    const storedEmail = localStorage.getItem('user-email');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handleCloseModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
    setSelectedSize("");
  };
  const handleSizeSelect = (size) => setSelectedSize(size);

  const handleAddToCart = async () => {
    if (!userEmail) return alert("Please log in first.");
    if (!selectedSize) return alert("Please select a size.");

    try {
      await axios.post("https://zara-clothing-brand-backend.onrender.com/api/cart", {
        name: selectedProduct.productName,
        price: selectedProduct.productPrice,
        image: selectedProduct.image,
        email: userEmail,
        quantity: 1,
        size: selectedSize,
      });
      alert("Item added to cart!");
      handleCloseModal();
    } catch (error) {
      alert("Error adding to cart.");
    }
  };

  const handleAddToWishlist = async () => {
    if (!userEmail) return alert("Please log in first.");
    if (!selectedSize) return alert("Please select a size.");

    try {
      await axios.post("https://zara-clothing-brand-backend.onrender.com/api/wishlist", {
        name: selectedProduct.productName,
        price: selectedProduct.productPrice,
        image: selectedProduct.image,
        email: userEmail,
        quantity: 1,
        size: selectedSize,
      });
      alert("Item added to wishlist!");
      handleCloseModal();
    } catch (error) {
      alert("Error adding to wishlist.");
    }
  };

  const filteredProducts = products.filter(product =>
    (selectedCategory === "All" || product.category === selectedCategory) &&
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <NavigationBar />
      <Container className="mt-5">
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        {/* Search and Filter */}
        <Row className="justify-content-center mb-4">
          <Col md={6}>
            <Form className="d-flex">
              <FormControl
                type="text"
                placeholder="Search Products"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ borderRadius: '20px', padding: '10px' }}
              />
            </Form>
          </Col>
          <Col md={4}>
            <Form.Group style={{ marginTop: "10px" }}>
              <Form.Control as="select" value={selectedCategory} onChange={handleCategoryChange}>
                <option>All</option>
                <option>Men</option>
                <option>Women</option>
                <option>Kids</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        {/* Loader */}
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="dark" />
            <p>Loading products...</p>
          </div>
        ) : (
          <Row>
            {filteredProducts.map(product => (
              <Col key={product._id} sm={12} md={6} lg={3} className="mb-4">
                <Card onClick={() => {
                  setSelectedProduct(product);
                  setShowProductModal(true);
                }} style={{ cursor: 'pointer', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
                  <Card.Img
                    variant="top"
                    src={`data:${product.imageType};base64,${Buffer.from(product.image).toString('base64')}`}
                    className="product-Cart-img"
                    style={{ borderRadius: '10px 10px 0 0', objectFit: 'cover', height: '300px' }}
                  />
                  <Card.Body>
                    <Card.Title>{product.productName}</Card.Title>
                    <Card.Text>
                      Category: {product.category}<br />
                      Price: ${product.productPrice}
                    </Card.Text>
                    <Button variant="dark" style={{ width: '100%', borderRadius: '20px' }}>View Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Product Modal */}
        <Modal show={showProductModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct?.productName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProduct && (
              <Row>
                <Col md={5} className="mb-3 text-center">
                  <img
                    src={`data:${selectedProduct.imageType};base64,${Buffer.from(selectedProduct.image).toString('base64')}`}
                    alt={selectedProduct.productName}
                    style={{ width: '100%', maxWidth: '200px', borderRadius: '10px', objectFit: 'cover' }}
                  />
                </Col>
                <Col md={7}>
                  <p><strong>Category:</strong> {selectedProduct.category}</p>
                  <p><strong>Price:</strong> ${selectedProduct.productPrice}</p>
                  <p><strong>Details:</strong> {selectedProduct.ProductDetails}</p>
                  <Form.Group>
                    <Dropdown>
                      <Dropdown.Toggle variant="secondary" id="dropdown-basic" style={{ borderRadius: '20px', width: '100%' }}>
                        {selectedSize ? `Size: ${selectedSize}` : "Select Size"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleSizeSelect("S")}>S</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSizeSelect("M")}>M</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSizeSelect("L")}>L</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSizeSelect("XL")}>XL</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                  <div className="d-flex gap-2 mt-3">
                    <Button variant="dark" style={{ flex: 1, borderRadius: '20px' }} onClick={handleAddToCart}>
                      <i className="fas fa-cart-plus"></i>
                    </Button>
                    <Button variant="outline-dark" style={{ flex: 1, borderRadius: '20px' }} onClick={handleAddToWishlist}>
                      <i className="far fa-heart"></i>
                    </Button>
                  </div>
                </Col>
              </Row>
            )}
          </Modal.Body>
        </Modal>
      </Container>
      <Footer />
    </>
  );
}

export default Store;
