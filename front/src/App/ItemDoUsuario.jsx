import { useEffect, useRef, useState } from "react";
import api from "../apiAcess";
import AddToCharacterDropdown from "../components/AdicionarItem";
import DeleteButton from "../components/DeleteItem";
import ExportButton from "../components/ExportItem";
import ImportButton from "../components/ImportItem";
import Item from "../components/items/Items";
import Menu from "../components/Menu";
import Button from "../components/ui/Button";
import Title from "../components/ui/Title";

function ItemsDoUsuario() {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [characterSheets, setCharacterSheets] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [menuData, setMenuData] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    api
      .get("/item/")
      .then((res) => {
        setItens(res.data);
        setLoading(false);
      })
      .catch(() => {
        setErro("Erro ao carregar os itens.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuData && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuData(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuData]);

  useEffect(() => {
    if (menuData) {
      api
        .get("/user/characters/")
        .then((res) => setCharacterSheets(res.data))
        .catch(console.error);
    }
  }, [menuData]);

  const handleDelete = (item) => {
    api
      .delete(`/item/${item.idSquare}/`)
      .then(() => setItens((prev) => prev.filter((i) => i.idSquare !== item.idSquare)))
      .catch(() => alert("Erro ao deletar item."));
  };

  const handleAddToCharacter = (charId, charName, item) => {
    const payload = {
      character_sheet: charId,
      item_base_id: item.idSquare,
      quantity: 1,
      currentUsageSquare: item.currentUsageSquare ?? item.maxUsageSquare ?? null,
      PositionX: null,
      PositionY: null,
    };

    api
      .post(`/characters/items/`, payload)
      .then(() => {
        alert(`Item adicionado à ficha ${charName}`);
        setShowDropdown(false);
      })
      .catch(() => alert("Erro ao adicionar item à ficha"));
  };

  const handleItemClick = (e, item) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuData({
      item,
      top: rect.bottom + window.scrollY + 5,
      left: rect.left + rect.width / 2 + window.scrollX,
    });
  };

  const CELL_SIZE = 150;
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fill, ${CELL_SIZE}px)`,
    gridAutoRows: `${CELL_SIZE}px`,
    gridAutoFlow: "dense",
    gap: 0,
    width: "100%",
  };
  const getItemStyle = (item) => ({
    gridColumnEnd: `span ${item.widthSquare}`,
    gridRowEnd: `span ${item.heightSquare}`,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  });

  if (erro) return <p>{erro}</p>;
  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <div className="ficha-itens">
        <Title>Meus Itens</Title>
      </div>
      <ImportButton onSuccess={() => window.location.reload()} />
      <div style={containerStyle}>
        {itens.length ? (
          itens.map((item) => (
            <Item key={item.idSquare} item={item} cellSize={CELL_SIZE} style={getItemStyle(item)} onClick={(e) => handleItemClick(e, item)} />
          ))
        ) : (
          <p>Nenhum item encontrado.</p>
        )}
      </div>

      {menuData && (
        <Menu ref={menuRef} top={menuData.top} left={menuData.left} onClose={() => setMenuData(null)}>
          <Button label="Adicionar a..." onClick={() => setShowDropdown((prev) => !prev)} />
          <AddToCharacterDropdown show={showDropdown} characters={characterSheets} item={menuData.item} onAdd={handleAddToCharacter} />
          <ExportButton item={menuData.item} onClose={() => setMenuData(null)} />
          <DeleteButton item={menuData.item} onDelete={handleDelete} onClose={() => setMenuData(null)} />
        </Menu>
      )}
    </div>
  );
}

export default ItemsDoUsuario;
