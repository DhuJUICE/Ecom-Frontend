import React, { useEffect, useState } from 'react';
import '../styles/moderate.css';
import { preloadModerationProductData } from './preLoadMenuData/preloadModerationProducts';
import { updateModerationStatus } from './apiComponents/api-products';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await preloadModerationProductData();
      setProducts(data || []);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleModeration = async (productId, status) => {
    const updatedProduct = await updateModerationStatus(productId, status);

    if (updatedProduct) {
      // Remove the product from the list after updating
      setProducts(prevProducts =>
        prevProducts.filter(product => product.id !== productId)
      );
    } else {
      alert(`Failed to update product moderation status to ${status}`);
    }
  };

  return (
    <div>
      <main>
        {loading ? (
          <div className="loading-container">
            <p>Loading Products waiting for Moderation...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="loading-container">
            <p>No products to be moderated at this point.</p>
          </div>
        ) : (
          <div className="menu">
            <div className="row">
              {products.map((product) => (
                <div key={product.id} className="product-card">
                  <img src={product.prodImagePath} alt={product.prodName} />
                  <p>{product.prodName}</p>
                  <p>R{product.prodPrice}</p>

                  <div className="action-buttons">
                    <button
                      className="approve-btn"
                      onClick={() => handleModeration(product.id, 'approved')}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleModeration(product.id, 'rejected')}
                    >
                      Reject
                    </button>
                  </div>
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
