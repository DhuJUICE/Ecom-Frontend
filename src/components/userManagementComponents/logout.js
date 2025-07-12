// src/components/Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { getAccessToken, removeAccessToken, removeRefreshToken, removeBusinessOwner} from '../tokenManagement/tokenManager'; // Import tokenManager functions

const Logout = () => {
  const navigate = useNavigate(); // Initialize navigate hook for redirection

  // Check if the user is logged in by using getAccessToken from tokenManager
  let isLoggedIn = !!getAccessToken(); // If a valid access token exists, the user is logged in

  const logout = () => {
    if (isLoggedIn) {
      // Use tokenManager to remove access token and refresh token
      removeAccessToken();
      removeRefreshToken();
	  removeBusinessOwner();

      // Optionally, show an alert or message
      alert('Logged out successfully');

      // Redirect to home page (or sign-in page) after logging out
      navigate('/');
    }
  };

  // If not logged in, don't render anything (or render something else if you prefer)
  if (!isLoggedIn) {
    return null; // Or you could return some alternative content, like a message
  }

  return (
    <a className="cart-container" onClick={logout}>
      <img className="cart" src="images/new-logout.png" alt="cart" />
    </a>
  );
};

export default Logout;
