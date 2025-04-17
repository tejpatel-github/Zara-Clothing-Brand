import React, { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

export default function FeatureProduct() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/items");
      if (Array.isArray(response.data)) {
        const formatted = response.data.map((item) => {
          const base64Image = Buffer.from(item.image.data).toString("base64");
          return {
            ...item,
            img: `data:${item.imageType};base64,${base64Image}`,
          };
        });
        setProducts(formatted);
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
    <div className="container py-4">
      <h2 className="text-left mb-5">Featured Products</h2>
      {error && <p className="text-danger text-center">{error}</p>}
      <div className="row g-4 justify-content-center main-card">
        {products.map((item, index) => (
          <div className="col-6 col-sm-4 col-md-3" key={index}>
            <div className="feature-card text-center">
              <img
                src={item.img}
                alt={item.productName}
                className="product-img img-fluid"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="feature-card-body mt-2">
                <span className="product-title d-block fw-bold">
                  {item.productName}
                </span>
                <span style={{color:"White"}} className="product-price">
                  ${item.productPrice}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
