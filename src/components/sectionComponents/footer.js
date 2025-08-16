// Footer.js
import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="copyrights">
        <p>
          &copy; {new Date().getFullYear()} Tummy Yummy's. All Rights Reserved. | Developed by JUGAMSOFT
        </p>
      </div>
    </div>
  );
};

export default Footer;
