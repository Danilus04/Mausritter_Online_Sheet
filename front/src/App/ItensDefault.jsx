// src/App/ItensDefault.jsx

import { useEffect, useState, useRef } from 'react';
import api from '../apiAcess';
import Item from '../components/items';
import Menu from '../components/Menu';

function ItensDefault() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  
  const [menuData, setMenuData] = useState(null); 
  const menuRef = useRef(null); 

  const handleDragStart = (e, item) => {};
  const handleDragOver = (e) => e.preventDefault();
  const handleDrop = (e, item) => {};
  const handleDragEnd = () => {};

  useEffect(() => {
    api.get('/item/')
      .then(response => {
        const formattedData = response.data.map(d => ({
          ...d,
          nameSquare: d.nameSquare || 'Item sem nome',
          widthSquare: d.widthSquare || 1,
          heightSquare: d.heightSquare || 1,
          maxUsageSquare: d.maxUsageSquare || 0,
          currentUsageSquare: d.currentUsageSquare || 0,
          imageSquare: d.imageSquare || null,
        }));
        setItens(formattedData);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar itens:", error);
        setErro("Erro ao carregar os itens.");
        setLoading(false);
      });
  }, []);
  
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuData && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuData(null);
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [menuData]);

  // Função chamada quando um item é clicado
  const handleItemClick = (event, item) => {
    event.stopPropagation();
    
    const rect = event.currentTarget.getBoundingClientRect();
    
    // O menu aparecerá abaixo e CENTRALIZADO com o item.
    setMenuData({
      item: item,
      top: rect.bottom + window.scrollY + 5, // Posição vertical abaixo do item
      left: rect.left + (rect.width / 2) + window.scrollX, // Posição horizontal no centro do item
    });
  };

  const containerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
  };

  if (erro) return <p>{erro}</p>;
  if (loading) return <p>Carregando itens...</p>;

  return (
    <div>
      <h2>Itens da Ficha</h2>
      <div style={containerStyle}>
        {itens.length > 0 ? (
          itens.map(item => (
            <Item
              key={item.idSquare}
              item={item}
              onDragStart={(e) => handleDragStart(e, item)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, item)}
              onDragEnd={handleDragEnd}
              onClick={(event) => handleItemClick(event, item)}
            />
          ))
        ) : (
          <p>Nenhum item encontrado.</p>
        )}
      </div>
      
      {menuData && (
        <Menu
          ref={menuRef}
          top={menuData.top}
          left={menuData.left}
          item={menuData.item}
          onClose={() => setMenuData(null)}
        />
      )}
    </div>
  );
}

export default ItensDefault;