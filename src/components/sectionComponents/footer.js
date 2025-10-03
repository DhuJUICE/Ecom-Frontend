// Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 px-6">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        {/* Left side */}
        <div className="text-gray-600 text-sm mb-2 sm:mb-0">
          &copy; {new Date().getFullYear()} HeranBites. All Rights Reserved.
        </div>

        {/* Right side */}
        <div className="text-gray-600 text-sm">
          Developed by{' '}
          <a
            href="https://heransoft.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            HeranSoft
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

