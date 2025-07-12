import React, { useEffect, useState } from 'react';
import '../styles/moderate.css';
import { preloadModerationProductData } from './preLoadMenuData/preloadModerationProducts';

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

  const handleApprove = async (productId) => {
    // TODO: Add your approve API call here
    alert(`Approve product ID: ${productId}`);
    // Optionally remove or update the product in the UI after approval
  };

  const handleReject = async (productId) => {
    // TODO: Add your reject API call here
    alert(`Reject product ID: ${productId}`);
    // Optionally remove or update the product in the UI after rejection
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
                      onClick={() => handleApprove(product.id)}
                    >
                      Approve
                    </button>
                    <button
                      className="reject-btn"
                      onClick={() => handleReject(product.id)}
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
