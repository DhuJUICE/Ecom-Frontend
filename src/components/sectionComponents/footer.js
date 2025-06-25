// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css'; // Import the CSS file
import UploadButton from '../buttonComponents/upload-button'; // Import the new component

const Footer = () => {
  return (
    <div>
      <div className="container">
        <div className="section">
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className="section">
          <Link to="/about">About Us</Link>
        </div>
          <UploadButton /> {/* Use the UploadButton component */}
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
