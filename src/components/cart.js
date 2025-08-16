import React, { useState, useEffect } from 'react';
import Checkout from './checkout';  
import '../styles/cart.css';
import { 
  fetchCartItems, 
  incrementCartItemAPI, 
  decrementCartItemAPI, 
  removeItemFromCartAPI 
} from './apiComponents/api-cart';

const Cart = () => {
  const [popupMessage, setPopupMessage] = useState(""); 
  const [loading, setLoading] = useState(true); 
  const [cartItems, setCartItems] = useState([]);
  const [isCheckoutPage, setIsCheckoutPage] = useState(false);
  const [showCartPage, setShowCartPage] = useState(true);

  // Fetch cart items on mount
  useEffect(() => {
    const loadCart = async () => {
      const data = await fetchCartItems();
      setCartItems(data || []);
      setLoading(false);
    };
    loadCart();
  }, []);

  const updateBadge = () => window.dispatchEvent(new CustomEvent("cartUpdated"));

  const incrementCartItem = async (productId) => {
    const result = await incrementCartItemAPI(productId);
    if (!result.success) return alert(result.message);

    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );

    updateBadge();
  };

  const decrementCartItem = async (productId) => {
    const result = await decrementCartItemAPI(productId);
    if (!result.success) return alert(result.message);

    setCartItems(prev =>
      prev.map(item =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      )
    );

    updateBadge();
  };

  const removeItemFromCart = async (productId) => {
    const result = await removeItemFromCartAPI(productId);
    if (!result.success) return alert(result.message);

    setCartItems(prev => prev.filter(item => item.id !== productId));

    updateBadge(); // ✅ Update badge after removing an item
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.prodPrice * item.quantity, 0);
  };

  const goToCheckout = () => {
    if (cartItems.length === 0) return alert("Your cart is empty!");
    localStorage.setItem("cartSubtotal", calculateTotal().toFixed(2));
    setShowCartPage(false);
    setIsCheckoutPage(true);
  };

  return (
    <main>
      {loading ? (
        <div className="loading-container">
          <p>Loading cart...</p>
        </div>
      ) : showCartPage ? (
        <section className="cart-container">
          <h2>Your Cart</h2>
          {popupMessage && <p className="error-message">{popupMessage}</p>}
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="cart-grid">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img className="item-image" src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p>R {item.prodPrice}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Total: R {(item.quantity * item.prodPrice).toFixed(2)}</p>
                  </div>
                  <div className="actions">
                    <button className="add" onClick={() => incrementCartItem(item.id)}>+</button>
                    <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
                    <button className="minus" onClick={() => decrementCartItem(item.id)}>-</button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="cart-summary">
            <p><strong>Subtotal:</strong> R {calculateTotal().toFixed(2)}</p>
            <button className="checkout-btn" onClick={goToCheckout}>Checkout</button>
          </div>
        </section>
      ) : (
        isCheckoutPage && <Checkout />
      )}
    </main>
  );
};

export default Cart;
