import React from 'react';
import './styles/Menu.css';

// Menu genérico
const Menu = React.forwardRef(({ top, left, onClose, children }, ref) => {
  return (
    <div 
      className="context-menu" 
      style={{ top: `${top}px`, left: `${left}px` }}
      ref={ref}
    >
      {children}
    </div>
  );
});

export default Menu;
