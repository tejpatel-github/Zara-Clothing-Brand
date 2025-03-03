import React, { useEffect, useState } from "react";
import NavigationBar from "./Navbar.jsx";
import axios from "axios";

function Product() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/items");
      if (Array.isArray(response.data)) {
        setProducts(response.data);
      } else {
        console.error("Response data is not an array:", response.data);
        setError("Unexpected response format");
      }
    } catch (error) {
      console.error("There was an error fetching the products!", error);
      setError("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <NavigationBar />

      <div className="header">
      <iframe 
  width="100%" 
  height="400" 
  src="https://www.youtube.com/embed/OouUgFMkMD0?autoplay=1&mute=1&loop=1&playlist=OouUgFMkMD0" 
  title="YouTube video player" 
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  style={{ display: "block", width: "100%", maxWidth: "100%" }}
></iframe>




      </div>
      <div className="main-product">

        <a href="/ProductDetails">
        <div className="product-detail">
            <img src="https://static.zara.net/assets/public/2eb7/0c90/40454d73bf3a/c7bed6e1485b/06462333800-570-p/06462333800-570-p.jpg?ts=1733732996671&w=1024" alt="None" />
            <div className="product-info">
                <h5>Zara Clothes</h5> 
                <span>$125.99</span>
            </div>
           
        </div></a>

        <a href="/ProductDetails">
        <div className="product-detail">
            <img src="https://static.zara.net/assets/public/2eb7/0c90/40454d73bf3a/c7bed6e1485b/06462333800-570-p/06462333800-570-p.jpg?ts=1733732996671&w=1024" alt="None" />
            <div className="product-info">
                <h5>Zara Clothes</h5> 
                <span>$125.99</span>
            </div>
           
        </div></a>

        <a href="/ProductDetails">
        <div className="product-detail">
            <img src="https://static.zara.net/assets/public/2eb7/0c90/40454d73bf3a/c7bed6e1485b/06462333800-570-p/06462333800-570-p.jpg?ts=1733732996671&w=1024" alt="None" />
            <div className="product-info">
                <h5>Zara Clothes</h5> 
                <span>$125.99</span>
            </div>
           
        </div></a>

        <a href="/ProductDetails">
        <div className="product-detail">
            <img src="https://static.zara.net/assets/public/2eb7/0c90/40454d73bf3a/c7bed6e1485b/06462333800-570-p/06462333800-570-p.jpg?ts=1733732996671&w=1024" alt="None" />
            <div className="product-info">
                <h5>Zara Clothes</h5> 
                <span>$125.99</span>
            </div>
           
        </div></a>

        <a href="/ProductDetails">
        <div className="product-detail">
            <img src="https://static.zara.net/assets/public/2eb7/0c90/40454d73bf3a/c7bed6e1485b/06462333800-570-p/06462333800-570-p.jpg?ts=1733732996671&w=1024" alt="None" />
            <div className="product-info">
                <h5>Zara Clothes</h5> 
                <span>$125.99</span>
            </div>
           
        </div></a>

      
        

      </div>
      
    </>
  );
}

export default Product;
