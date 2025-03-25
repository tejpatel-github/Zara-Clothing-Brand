import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateItem = ({ item, onUpdate, onCancel }) => {
  const [productName, setName] = useState('');
  const [productPrice, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (item) {
      setName(item.productName);
      setPrice(item.productPrice);
      setCategory(item.category);
    }
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productPrice', productPrice);
    formData.append('category', category);

    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`http://localhost:4000/api/items/${item._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUpdate();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Update Item</h3>
      <form onSubmit={handleSubmit} className="p-4 border rounded shadow">
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">Product Name</label>
          <input
            type="text"
            id="productName"
            className="form-control"
            value={productName}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">Product Price</label>
          <input
            type="number"
            id="productPrice"
            className="form-control"
            value={productPrice}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select
            id="category"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Product Image</label>
          <input
            type="file"
            id="image"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">Update</button>
          <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateItem;
