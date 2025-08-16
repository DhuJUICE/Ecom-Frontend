// Header.js
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import useLogout from '../userManagementComponents/logout';
import { getAccessToken } from '../tokenManagement/tokenManager';
import { fetchCartItems } from '../apiComponents/api-cart';
import "./header.css";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken());

  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const logout = useLogout();

  // Update login state periodically
  useEffect(() => {
    const checkLogin = () => {
      const loggedIn = !!getAccessToken();
      setIsLoggedIn(loggedIn);
      if (!loggedIn) setCartCount(0);
    };
    checkLogin();
    const interval = setInterval(checkLogin, 3000);
    return () => clearInterval(interval);
  }, []);

  // Fetch cart count
  const loadCartCount = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      setCartCount(0);
      return;
    }
    try {
      const items = await fetchCartItems();
      const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalQuantity);
    } catch (error) {
      console.error("Error loading cart count:", error);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) loadCartCount();
  }, [isLoggedIn, loadCartCount]);

  useEffect(() => {
    const handleCartUpdate = () => loadCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [loadCartCount]);

  const openCart = async () => {
    if (!getAccessToken()) {
      alert("You must be logged in to go to your cart");
      return;
    }
    setLoading(true);
    try {
      navigate('/cart');
    } catch (error) {
      alert("Error loading cart. Please try again later.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = () => navigate('/sign-in');

  return (
    <header>
      <div className="main-bar">
        <div className="title" onClick={() => navigate('/')}>
          <h1>Yummy <br /> Tummy's</h1>
        </div>

        <div className="icons">
			<div className="cart-container">

				{cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
				<button className="cart-btn" onClick={openCart}>
				{loading ? "Loading..." : "Cart"}
				</button>
			</div>
          <div className="user-menu-container">
            {!isLoggedIn ? (
              <button className="login-btn" onClick={handleLogin}>Login</button>
            ) : (
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="nav">
        <ul>
          <li>
            <button onClick={() => navigate('/menu')} className="nav-btn">Menu</button>
          </li>

          {isLoggedIn && role === "moderatorUser" && (
            <li>
              <button onClick={() => navigate('/moderate-product')} className="nav-btn">Moderate Products</button>
            </li>
          )}

          {isLoggedIn && role === "businessOwner" && (
            <>
              <li>
                <button onClick={() => navigate('/owner-mgmt-product')} className="nav-btn">Owner Manage Products</button>
              </li>
              <li>
                <button onClick={() => navigate('/upload-product')} className="nav-btn">Upload Products</button>
              </li>
            </>
          )}

          {isLoggedIn && role === "adminUser" && (
            <>
              <li>
                <button onClick={() => navigate('/moderate-product')} className="nav-btn">Moderate Products</button>
              </li>
              <li>
                <button onClick={() => navigate('/owner-mgmt-product')} className="nav-btn">Owner Manage Products</button>
              </li>
              <li>
                <button onClick={() => navigate('/upload-product')} className="nav-btn">Upload Products</button>
              </li>
              <li>
                <button onClick={() => navigate('/business-owners')} className="nav-btn">Business Owner Management Page</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
