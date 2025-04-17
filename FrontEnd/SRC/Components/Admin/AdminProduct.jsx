import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';
import UpdateItem from './UpdateItem.jsx';
import AdminNav from './AdminNav.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://zara-clothing-brand-backend.onrender.com/api/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://zara-clothing-brand-backend.onrender.com/api/items/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleUpdate = () => {
    fetchItems();
    setEditingItem(null);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  const toggleEditing = (item) => {
    setEditingItem(item);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleAddItem = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      await axios.post('https://zara-clothing-brand-backend.onrender.com/api/upload', formData);
      fetchItems();
      handleCloseModal();
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <>
      <AdminNav />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-center">Product List</h2>
          <button className="btn btn-primary" onClick={handleShowModal}>
            Add New Item
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-hover table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Image</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.productName}</td>
                  <td>{item.category}</td>
                  <td>
                    {item.image && (
                      <img
                        src={`data:${item.imageType};base64,${Buffer.from(item.image.data).toString('base64')}`}
                        className="img-thumbnail"
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        alt="item"
                      />
                    )}
                  </td>
                  <td>{item.quantity || 100}</td>
                  <td>{item.productPrice ? `$${item.productPrice}` : '$148.99'}</td>
                  <td>
                    <div className="d-flex flex-wrap gap-2">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => toggleEditing(item)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                    {editingItem && editingItem._id === item._id && (
                      <UpdateItem
                        item={item}
                        onUpdate={handleUpdate}
                        onCancel={handleCancel}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showModal && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Product</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleAddItem}>
                    <div className="mb-3">
                      <label className="form-label">Product Name</label>
                      <input type="text" className="form-control" name="productName" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Category</label>
                      <select className="form-select" name="category" required>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Price</label>
                      <input type="number" className="form-control" name="productPrice" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Image</label>
                      <input type="file" className="form-control" name="image" accept="image/*" required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Product Details</label>
                      <textarea className="form-control" name="ProductDetails" rows="3"></textarea>
                    </div>
                    <button type="submit" className="btn btn-success">Add Product</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ItemList;
