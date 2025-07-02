import { useEffect, useState } from "react";
import api from "../apiAcess";

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
    <div style={styles.container}>
      <h4>Itens fora da grade</h4>
      <ul>
        {items.map((item) => (
          <li key={item.id} style={styles.item}>
            <span>{item.item_base.nameSquare}</span>
            <div>
              <button
                onClick={() => handlePlaceAtZero(item.id, item.item_base.idSquare, item.character_sheet)}
                style={{ ...styles.button, marginRight: "6px" }}
              >
                Posicionar no inventario
              </button>
              <button onClick={() => handleDeleteItem(item.id)} style={styles.deleteButton}>
                Deletar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    marginTop: "20px",
    background: "#f7f7f7",
    padding: "10px",
    border: "1px solid #ccc",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  button: {
    padding: "4px 10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  deleteButton: {
    padding: "4px 10px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default OffGridItemManager;
