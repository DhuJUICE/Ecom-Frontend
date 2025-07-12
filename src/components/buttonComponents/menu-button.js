import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenuButton = () => {
  const navigate = useNavigate();

  const handleMenuOpen = async () => {
    navigate('/menu');
  };

  return (
    <a onClick={handleMenuOpen} style={{ cursor: 'pointer' }}>
      Menu
    </a>
  );
};

export default MenuButton;
