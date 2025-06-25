import React, { useState } from 'react';
import imagekit from './imagekit';  // adjust path if needed
import '../styles/upload-products.css';
import { uploadImageToImageKit } from './apiComponents/api-image-upload';

const UploadProducts = () => {
  const [productData, setProductData] = useState({
    prodName: '',
    prodPrice: '',
    prodDesc: '',
    prodAvailQuant: '',
    prodOnMenu: false,
    prodImagePath: ''
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (parseFloat(productData.prodPrice) < 20) {
      alert('Product price must be at least R20.');
      return;
    }
  
    if (!imageFile) {
      alert('Please select an image to upload.');
      return;
    }
  
    try {
      const imageUrl = await uploadImageToImageKit(imageFile);
  
      const fullProductData = {
        ...productData,
        prodImagePath: imageUrl
      };
  
      const response = await fetch('https://yummytummies-backend2.onrender.com/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fullProductData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Product successfully uploaded:', result);
        alert('Product uploaded successfully.');
      } else {
        throw new Error('Failed to upload product');
      }
  
      setProductData({
        prodName: '',
        prodPrice: '',
        prodDesc: '',
        prodAvailQuant: '',
        prodOnMenu: false,
        prodImagePath: ''
      });
  
      setImageFile(null);
      document.getElementById('prodImageInput').value = '';
  
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image.');
    }
  };

  return (
    <div className="upload-products-container">
      <h2>Upload New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="prodName">Product Name:</label>
          <input
            type="text"
            id="prodName"
            name="prodName"
            value={productData.prodName}
            onChange={handleChange}
            placeholder="e.g., Spicy Chicken Burger"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="prodPrice">Product Price (ZAR):</label>
          <input
            type="number"
            id="prodPrice"
            name="prodPrice"
            step="0.01"
            min="20"
            value={productData.prodPrice}
            onChange={handleChange}
            placeholder="e.g., 49.99"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="prodDesc">Product Description:</label>
          <input
            type="text"
            id="prodDesc"
            name="prodDesc"
            value={productData.prodDesc}
            onChange={handleChange}
            placeholder="Short description..."
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="prodAvailQuant">Available Quantity:</label>
          <input
            type="number"
            id="prodAvailQuant"
            name="prodAvailQuant"
            min="1"
            value={productData.prodAvailQuant}
            onChange={handleChange}
            placeholder="e.g., 10"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="prodImagePath">Upload Product Image:</label>
          <input
            type="file"
            id="prodImageInput"
            style={{ display: 'none' }}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImageFile(file);
                setProductData((prevData) => ({
                  ...prevData,
                  prodImagePath: file.name
                }));
              }
            }}
          />
          <button
            type="button"
            className="upload-btn"
            onClick={() => document.getElementById('prodImageInput').click()}
          >
            Upload Image
          </button>
          {productData.prodImagePath && (
            <p className="image-path-preview">Selected: {productData.prodImagePath}</p>
          )}
        </div>

        <button type="submit" className="submit-btn">Upload Product</button>
      </form>
    </div>
  );
};

export default UploadProducts;
