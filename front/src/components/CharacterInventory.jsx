import React, { useState, useEffect } from "react";
import Inventory from "../components/Inventory";
import api from '../apiAcess';

const CharacterInventory = ({ characterId }) => {
  const [itens, setItens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    api.get(`/characters/${characterId}/items/`)
      .then(response => {
        setItens(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar itens:", error);
        setErro("Erro ao carregar os itens.");
        setLoading(false);
      });
  }, [characterId]);

  if (loading) return <p>Carregando inventário...</p>;
  if (erro) return <p>{erro}</p>;

  const mappedItems = itens.map(item => ({
    id: item.id,
    character_sheet: item.character_sheet,
    nameSquare: item.item_base.nameSquare,
    widthSquare: item.item_base.widthSquare,
    heightSquare: item.item_base.heightSquare,
    imageSquare: item.item_base.imageSquare || null,
    maxUsageSquare: item.item_base.maxUsageSquare,
    currentUsageSquare: item.currentUsageSquare ?? item.item_base.currentUsageSquare,
    positionX: item.PositionX,
    positionY: item.PositionY,
  }));

  return (
    <div>
      <h3>Inventário do Personagem</h3>
      <Inventory items={mappedItems} gridWidth={5} gridHeight={2} />
    </div>
  );
};

export default CharacterInventory;
