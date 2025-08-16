import React, { useEffect, useState } from 'react';
import '../styles/menu.css';
import { addToCart } from './apiComponents/api-cart';
import { preloadMenuProductData } from './preLoadMenuData/preloadMenuProducts';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await preloadMenuProductData();
      setProducts(data || []);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleAddToCart = async (product) => {
    const accessToken = !!localStorage.getItem("accessToken");
    if (!accessToken) {
      alert("You must be logged in to add to cart");
      return;
    }

    const quantity = quantities[product.id] || 1;
    const result = await addToCart(product, quantity); // full product object
    if (!result.success) {
      alert(result.message || "Failed to add item.");
      return;
    }

    // ✅ Dispatch event for Header to update badge
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  };

  return (
    <main>
      {loading ? (
        <div className="loading-container"><p>Loading menu...</p></div>
      ) : products.length === 0 ? (
        <div className="loading-container"><p>No products available at the moment.</p></div>
      ) : (
        <div className="menu">
          <div className="row">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.prodImagePath} alt={product.prodName} />
                <p>{product.prodName}</p>
                <p>R{product.prodPrice}</p>
                <button
                  className="add-to-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default Menu;
