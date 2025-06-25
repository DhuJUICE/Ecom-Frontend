import React from 'react';
import MenuButton from '../buttonComponents/menu-button';

const NavigationBar = () => {
  return (
    <div
      className="nav"
      style={{
        backgroundColor: 'green',
        padding: '10px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        
      }}
    >
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        <li>
          <MenuButton />
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
