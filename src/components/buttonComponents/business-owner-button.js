// UploadButton.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAccessToken } from '../tokenManagement/tokenManager';

const BusinessOwnerButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getAccessToken());

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoggedIn(!!getAccessToken());
    }, 500); // Check every half a second

    return () => clearInterval(interval); // Cleanup
  }, []);

  if (!isLoggedIn) return null;

  return (
    <div className="section">
      <Link to="/business-owners">Business Owner Management Page</Link>
    </div>
  );
};

export default BusinessOwnerButton;
