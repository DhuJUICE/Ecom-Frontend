import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import UploadButton from '../buttonComponents/upload-button';

const Footer = () => {
  const isBusinessOwner = localStorage.getItem('business_owner') === 'true';

  return (
    <div>
      <div className="container">
        <div className="section">
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className="section">
          <Link to="/about">About Us</Link>
        </div>
        
        {/* Conditionally render the UploadButton */}
        {isBusinessOwner && <UploadButton />}
      </div>

      <div className="copyrights">
        <p>
          &copy; {new Date().getFullYear()} Tummy Yummy's. All Rights Reserved. | Developed by JugamSoft Technologies
        </p>
      </div>
    </div>
  );
};

export default Footer;
