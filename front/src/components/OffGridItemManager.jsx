import { useEffect, useState } from "react";
import api from "../apiAcess";
import "./styles/OffGridItemManager.css";

function OffGridItemManager({ characterId }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, [characterId]);

  const fetchItems = () => {
    api
      .get(`/characters/${characterId}/items/`)
      .then((response) => {
        const offGrid = response.data.filter(
          (item) => item.character_sheet === parseInt(characterId) && (item.PositionX === null || item.PositionY === null)
        );
        setItems(offGrid);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar itens:", error);
        setLoading(false);
      });
  };

  const handlePlaceAtZero = (id, itemBaseId, CharacterId) => {
    console.log("Colocando item no inventário:", id, itemBaseId, CharacterId);
    api
      .put(`/characters/items/${id}/`, {
        character_sheet: CharacterId,
        item_base_id: itemBaseId, // Corrigido o nome da chave
        PositionX: 0,
        PositionY: 0,
      })
      .then(() => {
        window.location.reload(); // Recarrega a página para atualizar o inventário
        //fetchItems(); // Atualiza sem recarregar a página
      })
      .catch(() => {
        alert("Erro ao atualizar item.");
      });
  };

  const handleDeleteItem = (id) => {
    if (!window.confirm("Tem certeza que deseja deletar este item?")) return;

    api
      .delete(`/characters/items/${id}/`)
      .then(() => {
        setItems((prev) => prev.filter((item) => item.id !== id));
      })
      .catch(() => {
        alert("Erro ao deletar item.");
      });
  };

  if (loading) return <p>Carregando itens...</p>;

  if (items.length === 0) {
    return <p>Todos os itens estão posicionados.</p>;
  }

  return (
    <div className="offgrid-container">
      <h4>Itens fora da grade</h4>
      <ul>
        {items.map((item) => (
          <li key={item.id} className="offgrid-item">
            <span>{item.item_base.nameSquare}</span>
            <div className="offgrid-buttons">
              <button className="offgrid-place" onClick={() => handlePlaceAtZero(item.id, item.item_base.idSquare, item.character_sheet)}>
                Posicionar no inventário
              </button>
              <button className="offgrid-delete" onClick={() => handleDeleteItem(item.id)}>
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OffGridItemManager;
