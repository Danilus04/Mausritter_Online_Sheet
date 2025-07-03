import { useRef, useState } from "react";
import api from "../apiAcess";
import Item from "./items/Items";
import "./styles/inventory.css";

function Inventory({ items, gridWidth, gridHeight }) {
  const [localItems, setLocalItems] = useState(items);
  const [draggingItem, setDraggingItem] = useState(null);
  const inventoryRef = useRef(null);

  const handleDragStart = (e, item) => {
    console.log("[DragStart] Iniciando com item:", item);
    setDraggingItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    // Esse log confirma que o grid está aceitando drag
    console.log("[DragOver] Mouse sobre célula do grid");
  };

  const handleDrop = (e, targetX, targetY) => {
    console.log("[Drop] Tentativa de soltar item em:", targetX, targetY);

    if (!draggingItem) {
      // Tenta pegar do dataTransfer (caso o item tenha vindo de fora do inventário)
      const raw = e.dataTransfer.getData("application/json");
      if (raw) {
        const parsed = JSON.parse(raw);
        console.log("[Drop] Item vindo do dataTransfer:", parsed);
        setDraggingItem(parsed);
        return; // Deixe o estado se atualizar antes de continuar
      }

      console.warn("[Drop] Nenhum item sendo arrastado.");
      return;
    }

    const itemWidth = draggingItem.widthSquare;
    const itemHeight = draggingItem.heightSquare;

    const isOutOfBounds = targetX < 0 || targetY < 0 || targetX + itemWidth > gridWidth || targetY + itemHeight > gridHeight;

    if (isOutOfBounds) {
      console.warn("[Drop] Fora dos limites do grid");
      setDraggingItem(null);
      return;
    }

    console.log("[Drop] Enviando atualização para o item:", draggingItem);

    api
      .put(`/characters/items/${draggingItem.id}/`, {
        item_base_id: draggingItem.item_base_id,
        PositionX: targetX,
        PositionY: targetY,
        character_sheet: draggingItem.character_sheet,
      })
      .then((response) => {
        console.log("[Drop] Atualização bem-sucedida:", response.data);
        const updatedItems = localItems.map((it) => {
          if (it.id === draggingItem.id) {
            return { ...it, positionX: targetX, positionY: targetY };
          }
          return it;
        });

        setLocalItems(updatedItems);
        setDraggingItem(null);
      })
      .catch((error) => {
        console.error("[Drop] Erro ao atualizar posição:", error);
        setDraggingItem(null);
      });
  };

  const handleDragEnd = (e) => {
    console.log("[DragEnd] Finalizando drag");
    if (!draggingItem) return;

    const inventoryRect = inventoryRef.current.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const isInsideGrid =
      mouseX >= inventoryRect.left && mouseX <= inventoryRect.right && mouseY >= inventoryRect.top && mouseY <= inventoryRect.bottom;

    if (!isInsideGrid) {
      console.log("[DragEnd] Item foi solto fora do grid, removendo");
      api
        .put(`/characters/items/${draggingItem.id}/`, {
          PositionX: null,
          PositionY: null,
          item_base_id: draggingItem.item_base_id,
          character_sheet: draggingItem.character_sheet,
        })
        .then((response) => {
          window.location.reload();
          console.log("Item removido do grid com sucesso:", response.data);

          const updatedItems = localItems.map((it) => {
            if (it === draggingItem) {
              return { ...it, positionX: null, positionY: null };
            }
            return it;
          });

          setLocalItems(updatedItems);
          setDraggingItem(null);
        })
        .catch((error) => {
          console.error("Erro ao remover item do grid:", error);
          setDraggingItem(null);
        });
    } else {
      console.log("[DragEnd] Item solto dentro do grid");
      setDraggingItem(null);
    }
  };

  const gridCells = [];
  for (let y = 0; y < gridHeight; y++) {
    for (let x = 0; x < gridWidth; x++) {
      gridCells.push(
        <div
          key={`${x}-${y}`}
          className="grid-cell"
          style={{
            width: "150px",
            height: "150px",
            border: "1px dashed #ccc",
            boxSizing: "border-box",
            position: "absolute",
            left: `${x * 150}px`,
            top: `${y * 150}px`,
          }}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, x, y)}
        ></div>
      );
    }
  }

  return (
    <div
      ref={inventoryRef}
      className="inventory-grid"
      style={{
        width: gridWidth * 150,
        height: gridHeight * 150,
        position: "relative",
      }}
    >
      {gridCells}

      {localItems
        .filter((item) => item.positionX !== null && item.positionY !== null)
        .map((item, index) => {
          const left = item.positionX * 150;
          const top = item.positionY * 150;

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                left: `${left}px`,
                top: `${top}px`,
                width: `${item.widthSquare * 150}px`,
                height: `${item.heightSquare * 150}px`,
                zIndex: draggingItem === item ? 10 : 1,
              }}
            >
              <Item
                item={item}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, item.positionX, item.positionY)}
                onDragEnd={handleDragEnd}
              />
            </div>
          );
        })}
    </div>
  );
}

export default Inventory;
