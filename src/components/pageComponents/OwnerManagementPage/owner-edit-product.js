import React from 'react';

const EditProductModal = ({ formValues, onChange, onSave, onCancel }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onCancel}
    >
      <div
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onCancel}
          aria-label="Close edit modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl font-bold"
        >
          &times;
        </button>

        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Edit Product
        </h3>

        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="prodName" className="block text-gray-700 font-semibold mb-1">
              Product Name:
            </label>
            <input
              id="prodName"
              name="prodName"
              value={formValues.prodName}
              onChange={onChange}
              placeholder="Enter product name"
              autoFocus
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="prodPrice" className="block text-gray-700 font-semibold mb-1">
              Product Price (min R20):
            </label>
            <input
              id="prodPrice"
              name="prodPrice"
              type="number"
              min="20"
              value={formValues.prodPrice}
              onChange={onChange}
              placeholder="Enter product price"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="prodDesc" className="block text-gray-700 font-semibold mb-1">
              Product Description:
            </label>
            <input
              id="prodDesc"
              name="prodDesc"
              value={formValues.prodDesc}
              onChange={onChange}
              placeholder="Enter product description"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="prodAvailQuant" className="block text-gray-700 font-semibold mb-1">
              Available Quantity (min 1):
            </label>
            <input
              id="prodAvailQuant"
              name="prodAvailQuant"
              type="number"
              min="1"
              value={formValues.prodAvailQuant}
              onChange={onChange}
              placeholder="Enter available quantity"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onSave}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
