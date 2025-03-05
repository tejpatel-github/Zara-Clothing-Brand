import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function ProductDetails() {
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Product Image */}
        <div className="col-md-6">
        <img
  src="https://static.zara.net/assets/public/2eb7/0c90/40454d73bf3a/c7bed6e1485b/06462333800-570-p/06462333800-570-p.jpg?ts=1733732996671&w=1024"
  alt="Product"
  className="img-fluid"
  style={{ height: "400px", width: "400px" }}
/>

        </div>
        
        {/* Product Details */}
        <div className="col-md-6">
          <h2>Product Name</h2>
          <p className="text-muted">Category: Men</p>
          <p className="lead">$299.99</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            rhoncus, urna eu tincidunt condimentum, ante augue congue nunc,
            vitae gravida enim sapien eget purus.
          </p>

          {/* Add to Cart Button */}
          <button className="btn btn-primary btn-lg">Add to Cart</button>
        </div>
      </div>

      {/* Product Reviews */}
      <div className="mt-5">
        <h4>Customer Reviews</h4>
        <div className="list-group">
          <div className="list-group-item">
            <h5 className="mb-1">Tirth Patel</h5>
            <p className="mb-1">Great product! Worth every penny.</p>
          </div>
          <div className="list-group-item">
            <h5 className="mb-1">Tej</h5>
            <p className="mb-1">Good quality but a little expensive.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
