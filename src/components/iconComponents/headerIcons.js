// HeaderIcons.js
import React, { useState } from 'react';
import Logout from '../userManagementComponents/logout'; // Assuming Logout component is in the same directory
import CartButton from '../buttonComponents/cart-button'; // Import CartButton component
import UserButton from '../buttonComponents/user-button'; // Import UserButton component

const HeaderIcons = () => {
  const [userMenuVisible, setUserMenuVisible] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuVisible((prevState) => !prevState);
  };

  return (
    <div className="icons">
      <CartButton/>
      <UserButton/>
      <Logout /> {/* Logout component will be shown only if the user is logged in */}
    </div>
  );
};

export default HeaderIcons;
