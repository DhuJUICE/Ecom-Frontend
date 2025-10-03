import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import useLogout from '../userManagementComponents/logout';
import { getAccessToken } from '../userManagementComponents/tokenManagement/tokenManager';
import { fetchCartItems } from '../apiComponents/api-cart';

const Header = () => {
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken());
  const navigate = useNavigate();
  const logout = useLogout();

  // Check login status periodically
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

  // Load cart count
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

  const openCart = () => {
    if (!getAccessToken()) {
      navigate("/sign-in");
      return;
    }
    setLoading(true);
    navigate('/cart');
    setLoading(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-green-600 cursor-pointer"
          onClick={() => navigate('/')}
        >
          HeranBites
        </div>

        {/* Cart & Login/Logout */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              onClick={openCart}
              className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <FaShoppingCart />
              <span>{loading ? 'Loading...' : 'Cart'}</span>
            </button>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {!isLoggedIn ? (
            <button
              onClick={() => navigate('/sign-in')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-gray-50 shadow-inner">
        <ul className="container mx-auto flex justify-center space-x-4 py-3 px-6">
          <li>
            <button
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Menu
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
