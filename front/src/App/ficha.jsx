// src/App/ficha.jsx
import { useEffect, useState, useRef } from 'react';
import api from '../apiAcess';
import Item from '../components/items';
import Menu from '../components/Menu';

function Ficha() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const [menuData, setMenuData] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    api.get('/item/')
      .then(response => {
        setItens(response.data);
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
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [menuData]);

  const handleDelete = (item) => {
    api.delete(`/item/${item.idSquare}/`)
      .then(() => {
        setItens(itens.filter(i => i.idSquare !== item.idSquare));
      })
      .catch(err => {
        console.error("Erro ao deletar item:", err);
        alert("Erro ao deletar item.");
      });
  };

  const handleItemClick = (event, item) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuData({
      item: item,
      top: rect.bottom + window.scrollY + 5,
      left: rect.left + (rect.width / 2) + window.scrollX,
    });
  };

  const CELL_SIZE = 150;

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, ${CELL_SIZE}px)`,
    gridAutoRows: `${CELL_SIZE}px`,
    gridAutoFlow: 'dense',
    gap: 0,
    width: '100%',
  };

  const getItemStyle = (item) => ({
    gridColumnEnd: `span ${item.widthSquare}`,
    gridRowEnd: `span ${item.heightSquare}`,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  });

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
              cellSize={CELL_SIZE}
              style={getItemStyle(item)}
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
          onClose={() => setMenuData(null)}
        >
          <button onClick={() => {
            handleDelete(menuData.item);
            setMenuData(null);
          }}>
            Deletar
          </button>
        </Menu>
      )}
    </div>
  );
}

export default Ficha;
