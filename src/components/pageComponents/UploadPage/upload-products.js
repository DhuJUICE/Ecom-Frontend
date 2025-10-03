import React, { useState } from 'react';
import { uploadImageToImageKit } from '../../apiComponents/api-image-upload';
import { API_URL } from "../../apiComponents/api-base-url";

const UploadProducts = () => {
  const [productData, setProductData] = useState({
    prodName: '',
    prodPrice: '',
    prodDesc: '',
    prodAvailQuant: '',
    prodImagePath: ''
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value
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

    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("You must be logged in to upload a product.");
      return;
    }

    try {
      const imageUrl = await uploadImageToImageKit(imageFile);

      const fullProductData = { ...productData, prodImagePath: imageUrl };

      const response = await fetch(`${API_URL}/api/product/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(fullProductData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Product uploaded successfully!');
      } else {
        const errorData = await response.json();
        alert('Failed to upload product: ' + (errorData.message || ''));
        return;
      }

      setProductData({ prodName: '', prodPrice: '', prodDesc: '', prodAvailQuant: '', prodImagePath: '' });
      setImageFile(null);
      document.getElementById('prodImageInput').value = '';
    } catch (error) {
      alert('Something went wrong while uploading the product.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-8">
        <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Upload New Product</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Product Name:</label>
            <input
              type="text"
              name="prodName"
              value={productData.prodName}
              onChange={handleChange}
              placeholder="e.g., Spicy Chicken Burger"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Product Price (ZAR):</label>
            <input
              type="number"
              name="prodPrice"
              value={productData.prodPrice}
              onChange={handleChange}
              placeholder="e.g., 49.99"
              min="20"
              step="0.01"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Product Description:</label>
            <input
              type="text"
              name="prodDesc"
              value={productData.prodDesc}
              onChange={handleChange}
              placeholder="Short description..."
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Available Quantity:</label>
            <input
              type="number"
              name="prodAvailQuant"
              value={productData.prodAvailQuant}
              onChange={handleChange}
              placeholder="e.g., 10"
              min="1"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">Upload Product Image:</label>
            <input
              type="file"
              id="prodImageInput"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImageFile(file);
                  setProductData((prevData) => ({ ...prevData, prodImagePath: file.name }));
                }
              }}
            />
            <button
              type="button"
              onClick={() => document.getElementById('prodImageInput').click()}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Select Image
            </button>
            {productData.prodImagePath && (
              <p className="mt-2 text-gray-600">Selected: {productData.prodImagePath}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition"
          >
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProducts;
