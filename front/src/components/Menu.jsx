import React from 'react';
import './Menu.css';

// Usamos React.forwardRef para passar a 'ref' do pai para o DOM do menu.
// Isso é essencial para a lógica de "clicar fora".
const Menu = React.forwardRef(({ top, left, item, onClose }, ref) => {
  
  const handleImportClick = () => {
    console.log("Importando o item:", item.nameSquare);
    // Aqui você adicionaria sua lógica de importação
    onClose(); // Fecha o menu após clicar no botão
  };

  return (
    <div 
      className="context-menu" 
      style={{ top: `${top}px`, left: `${left}px` }}
      ref={ref} // Atribui a ref ao elemento principal do menu
    >
      <button onClick={handleImportClick}>Import</button>
    </div>
  );
});

export default Menu;