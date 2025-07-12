import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from '../tokenManagement/tokenManager'; // ✅ Import the token manager

const CartButton = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false); // ✅ Loading state
  const [popupMessage, setPopupMessage] = useState(""); // ✅ Error message state

  const openCart = async () => {
    // Use getAccessToken to check if the user is logged in
    const token = getAccessToken();

    if (!token) {
      alert("You must be logged in to go to your cart");
      return;
    }
    setLoading(true); // Show loading state

    try {
      navigate('/cart'); // Navigate to the cart page if successful
	  window.location.reload();
	  
    } catch (error) {
      alert("Error loading cart. Please try again later.");
      setLoading(false); // Hide loading state on error
    }
  };

  return (
    <a className="cart-container" onClick={openCart}>
      {loading ? <span>Loading...</span> : <img className="cart" src="images/online-shopping.png" alt="cart" />}
      {popupMessage && <p className="error-message">{popupMessage}</p>}
    </a>
  );
};

export default CartButton;
