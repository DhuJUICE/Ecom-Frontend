import React, { useEffect, useState } from 'react';
import '../styles/owner-mgmt-products.css';
import { preloadOwnerProductData } from './preLoadMenuData/preloadOwnerProducts';
import { deleteOwnerProduct, updateOwnerProduct } from './apiComponents/api-products';
import EditProductModal from './owner-edit-product';

const Menu = () => {
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

    // Validation
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
      setEditingProduct(null); // close modal
    } else {
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div>
      <main>
        {loading ? (
          <div className="loading-container">
            <p>Loading Your Business Products Previously Uploaded...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="loading-container">
            <p>You have not uploaded any products to the platform.</p>
          </div>
        ) : (
          <div className="menu">
            <div className="row">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.prodImagePath} alt={product.prodName} />
                  <p>{product.prodName}</p>
                  <p>R{product.prodPrice}</p>

                  <div className="product-btn-group">
                    <button
                      className="edit-product-btn"
                      onClick={() => handleEditClick(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-product-btn"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editingProduct && (
          <EditProductModal
            formValues={formValues}
            onChange={handleFormChange}
            onSave={handleUpdateProduct}
            onCancel={() => setEditingProduct(null)}
          />
        )}
      </main>
    </div>
  );
};

export default Menu;
