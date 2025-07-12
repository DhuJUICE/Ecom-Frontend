import React, { useEffect, useState } from 'react';
import '../styles/menu.css';
import { addToCart } from './apiComponents/api-cart';
import { preloadOwnerProductData } from './preLoadMenuData/preloadOwnerProducts';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
	const loadData = async () => {
	  const data = await preloadOwnerProductData();
	  setProducts(data || []);
	  setLoading(false);
	};
  
	loadData();
  }, []);

  const handleAddToCart = async (productId, quantity) => {
    const accessToken = !!localStorage.getItem("accessToken");
    if (accessToken) {
      const result = await addToCart(productId, quantity);
      if (result.success) {
        alert("Item added to cart!");
      } else {
        alert(result.message || "Failed to add item.");
      }
    } else {
      alert("You must be logged in to add to cart");
    }
  };

  return (
    <div>
      <main>
        {loading ? (
          <div className="loading-container">
            <p>Loading menu...</p>
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
                    className="add-to-cart"
                    onClick={() => handleAddToCart(product.id, quantities[product.id] || 1)}
                  >
                    Add to Cart
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
