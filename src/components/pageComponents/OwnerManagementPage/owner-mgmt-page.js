import React, { useEffect, useState } from 'react';
import { preloadOwnerProductData } from '../../preLoadMenuData/preloadOwnerProducts';
import { deleteOwnerProduct, updateOwnerProduct } from '../../apiComponents/api-products';
import EditProductModal from './owner-edit-product';

const OwnerMgmtProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formValues, setFormValues] = useState({
    prodName: '',
    prodPrice: '',
    prodDesc: '',
    prodAvailQuant: '',
  });

  useEffect(() => {
    const loadData = async () => {
      const data = await preloadOwnerProductData();
      setProducts(data || []);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setFormValues({
      prodName: product.prodName,
      prodPrice: product.prodPrice,
      prodDesc: product.prodDesc,
      prodAvailQuant: product.prodAvailQuant,
    });
  };

  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    const success = await deleteOwnerProduct(productId);
    if (success) {
      setProducts(prev => prev.filter(product => product.id !== productId));
    } else {
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleUpdateProduct = async () => {
    const { prodName, prodPrice, prodDesc, prodAvailQuant } = formValues;

    if (Number(prodPrice) < 20) {
      alert("Price must be at least R20.");
      return;
    }
    if (Number(prodAvailQuant) < 1) {
      alert("Available quantity must be at least 1.");
      return;
    }

    const updated = await updateOwnerProduct(editingProduct.id, {
      prodName,
      prodPrice,
      prodDesc,
      prodAvailQuant,
    });

    if (updated) {
      setProducts(prev =>
        prev.map(p => (p.id === editingProduct.id ? updated : p))
      );
      setEditingProduct(null);
    } else {
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">Loading your business products...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">You have not uploaded any products yet.</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">Your Uploaded Products</h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow p-4 flex flex-col justify-between hover:shadow-lg transition-shadow">
                <img
                  src={product.prodImagePath}
                  alt={product.prodName}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{product.prodName}</h3>
                  <p className="text-green-600 font-bold mt-1">R{product.prodPrice}</p>
                </div>
                <div className="mt-4 flex justify-between gap-2">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {editingProduct && (
        <EditProductModal
          formValues={formValues}
          onChange={handleFormChange}
          onSave={handleUpdateProduct}
          onCancel={() => setEditingProduct(null)}
        />
      )}
    </main>
  );
};

export default OwnerMgmtProducts;
