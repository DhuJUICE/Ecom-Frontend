// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderIcons from '../iconComponents/headerIcons'; // Import the HeaderIcons component
import NavigationBar from '../navigationComponents/navigation-bar';

const Header = ({ cartCount }) => {
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const toggleUserMenu = () => setUserMenuVisible((prev) => !prev);

  return (
    <div>
      <header>
        <div className="main-bar">
          <Link to="/">
            <div className="title">
              <img
                className="logo"
                src={`${process.env.PUBLIC_URL}/images/ramen.png`}
                alt="logo"
              />
              <h1>
                Yummy <br />
                Tummy's
              </h1>
            </div>
          </Link>
          <HeaderIcons/>
        </div>
        <NavigationBar/>
      </header>
    </div>
  );
};

export default Header;
