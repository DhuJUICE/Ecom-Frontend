import React from 'react';
import '../styles/owner-mgmt-products.css';

const EditProductModal = ({
  formValues,
  onChange,
  onSave,
  onCancel,
}) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onCancel} aria-label="Close edit modal">
          &times;
        </button>

        <h3>Edit Product</h3>

        <label htmlFor="prodName">Product Name:</label>
        <input
          id="prodName"
          name="prodName"
          value={formValues.prodName}
          onChange={onChange}
          placeholder="Enter product name"
          autoFocus
        />

        <label htmlFor="prodPrice">Product Price (min R20):</label>
        <input
          id="prodPrice"
          name="prodPrice"
          type="number"
          min="20"
          value={formValues.prodPrice}
          onChange={onChange}
          placeholder="Enter product price"
        />

        <label htmlFor="prodDesc">Product Description:</label>
        <input
          id="prodDesc"
          name="prodDesc"
          value={formValues.prodDesc}
          onChange={onChange}
          placeholder="Enter product description"
        />

        <label htmlFor="prodAvailQuant">Available Quantity (min 1):</label>
        <input
          id="prodAvailQuant"
          name="prodAvailQuant"
          type="number"
          min="1"
          value={formValues.prodAvailQuant}
          onChange={onChange}
          placeholder="Enter available quantity"
        />

        <div className="modal-actions">
          <button onClick={onSave}>Save</button>
          <button onClick={onCancel} className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
