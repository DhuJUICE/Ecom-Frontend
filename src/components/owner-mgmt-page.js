import React, { useEffect, useState } from 'react';
import '../styles/owner-mgmt-products.css';
import { preloadOwnerProductData } from './preLoadMenuData/preloadOwnerProducts';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await preloadOwnerProductData();
      setProducts(data || []);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleEditProduct = (productId) => {
    // TODO: Implement the edit product logic here
    // For example, redirect to an edit page or open a modal
    alert(`Edit product with ID: ${productId}`);
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

                  <button
                    className="edit-product-btn"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    Edit Product
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Menu;
