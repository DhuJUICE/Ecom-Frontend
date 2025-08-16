// Header.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logout from '../userManagementComponents/logout';
import { getAccessToken } from '../tokenManagement/tokenManager';
import { fetchCartItems } from '../apiComponents/api-cart';
import "./header.css";

const Header = () => {
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken());
  const [cartCount, setCartCount] = useState(0);

  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const userMenuRef = useRef(null);

  // Update login state on mount and periodically
  useEffect(() => {
    const checkLogin = () => {
      const loggedIn = !!getAccessToken();
      setIsLoggedIn(loggedIn);
      if (!loggedIn) setCartCount(0); // Reset badge if logged out
    };
    checkLogin();
    const interval = setInterval(checkLogin, 3000); // slower interval
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

  // Load badge when logged in
  useEffect(() => {
    if (isLoggedIn) loadCartCount();
  }, [isLoggedIn, loadCartCount]);

  // Listen for add-to-cart events
  useEffect(() => {
    const handleCartUpdate = () => loadCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => window.removeEventListener("cartUpdated", handleCartUpdate);
  }, [loadCartCount]);

  // Cart button
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

  // User dropdown
  const toggleUserMenu = () => setUserMenuVisible(prev => !prev);
  const handleSignIn = () => navigate('/sign-in');
  const handleSignUp = () => navigate('/sign-up');
  const handleMenuOpen = () => navigate('/menu');

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header>
      <div className="main-bar">
        <Link to="/">
          <div className="title">
            <h1>Yummy <br /> Tummy's</h1>
          </div>
        </Link>

        <div className="icons">
          <div className="cart-container" onClick={openCart}>
            {loading ? <span>Loading...</span> : <img className="cart" src="images/online-shopping.png" alt="cart" />}
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            {popupMessage && <p className="error-message">{popupMessage}</p>}
          </div>

          <div className="user-menu-container" ref={userMenuRef}>
            <img className="user" src="images/user.png" alt="user" onClick={toggleUserMenu} />
            {userMenuVisible && (
              <div className="dropdown active">
                <a onClick={handleSignIn}>Login</a>
                <a onClick={handleSignUp}>Sign Up</a>
              </div>
            )}
          </div>

          <Logout />
        </div>
      </div>

      <div className="nav">
        <ul>
          <li><a onClick={handleMenuOpen} style={{ cursor: 'pointer' }}>Menu</a></li>

          {isLoggedIn && role === "moderatorUser" && <li><Link to="/moderate-product">Moderate Products</Link></li>}
          {isLoggedIn && role === "businessOwner" && (
            <>
              <li><Link to="/owner-mgmt-product">Owner Manage Products</Link></li>
              <li><Link to="/upload-product">Upload Products</Link></li>
            </>
          )}
          {isLoggedIn && role === "adminUser" && (
            <>
              <li><Link to="/moderate-product">Moderate Products</Link></li>
              <li><Link to="/owner-mgmt-product">Owner Manage Products</Link></li>
              <li><Link to="/upload-product">Upload Products</Link></li>
              <li><Link to="/business-owners">Business Owner Management Page</Link></li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
