import React from 'react';
import { useNavigate } from 'react-router-dom';
import { preloadMenuData } from '../preLoadMenuData/preloadMenu.js'; // ⬅️ New import

const MenuButton = () => {
  const navigate = useNavigate();

  const handleMenuOpen = async () => {
    await preloadMenuData();
    navigate('/menu');
  };

  return (
    <a onClick={handleMenuOpen} style={{ cursor: 'pointer' }}>
      Menu
    </a>
  );
};

export default MenuButton;
