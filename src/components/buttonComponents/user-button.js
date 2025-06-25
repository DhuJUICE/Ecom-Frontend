import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const UserButton = () => {
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const navigate = useNavigate();
  const userMenuRef = useRef(null); // Create a reference for the user menu

  // Toggle the visibility of the user menu
  const toggleUserMenu = () => {
    setUserMenuVisible(!userMenuVisible);
  };

  // Handle navigation to the Sign In page
  const handleSignIn = () => {
    navigate('/sign-in'); // Navigate to the Sign In page
  };

  // Handle navigation to the Sign Up page
  const handleSignUp = () => {
    navigate('/sign-up'); // Navigate to the Sign Up page
  };

  // Close the dropdown when clicking outside
  const handleClickOutside = (event) => {
    if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
      setUserMenuVisible(false);
    }
  };

  useEffect(() => {
    // Add event listener to detect clicks outside the menu
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <a className="cart-container">
      <div className="user-menu" ref={userMenuRef}>
        <img
          className="user"
          src="images/user.png"
          alt="user"
          onClick={toggleUserMenu}
        />
        {userMenuVisible && (
          <div className="dropdown active">
            <a onClick={handleSignIn}>Login</a>
            <a onClick={handleSignUp}>Sign Up</a>
          </div>
        )}
      </div>
    </a>
  );
};

export default UserButton;
