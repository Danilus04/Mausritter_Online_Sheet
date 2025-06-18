import Item from './items';
import './inventory.css';
import { useState, useRef } from 'react';
import api from '../apiAcess';

function Inventory({ items, gridWidth, gridHeight }) {
  const [localItems, setLocalItems] = useState(items);
  const [draggingItem, setDraggingItem] = useState(null);
  const inventoryRef = useRef(null);

  const handleDragStart = (e, item) => {
    setDraggingItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Permite o drop
  };

  const handleDrop = (e, targetX, targetY) => {
    if (!draggingItem) return;

    api.put(`/user/items/${draggingItem.id}/`, {
      PositionX: targetX,
      PositionY: targetY,
      user: draggingItem.user,
    })
      .then(response => {
        console.log('Posição atualizada com sucesso:', response.data);

        const updatedItems = localItems.map((it) => {
          if (it === draggingItem) {
            return { ...it, positionX: targetX, positionY: targetY };
          }
          return it;
        });

        setLocalItems(updatedItems);
        setDraggingItem(null);
      })
      .catch(error => {
        console.error('Erro ao atualizar posição:', error);
        setDraggingItem(null);
      });
  };

  const handleDragEnd = (e) => {
    if (!draggingItem) return;

    const inventoryRect = inventoryRef.current.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const isInsideGrid =
      mouseX >= inventoryRect.left &&
      mouseX <= inventoryRect.right &&
      mouseY >= inventoryRect.top &&
      mouseY <= inventoryRect.bottom;

    if (!isInsideGrid) {
      api.put(`/user/items/${draggingItem.id}/`, {
        PositionX: null,
        PositionY: null,
        user: draggingItem.user,
      })
        .then(response => {
          console.log('Item removido do grid com sucesso:', response.data);

          const updatedItems = localItems.map((it) => {
            if (it === draggingItem) {
              return { ...it, positionX: null, positionY: null };
            }
            return it;
          });

          setLocalItems(updatedItems);
          setDraggingItem(null);
        })
        .catch(error => {
          console.error('Erro ao remover item do grid:', error);
          setDraggingItem(null);
        });
    } else {
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
            width: '150px',
            height: '150px',
            border: '1px dashed #ccc',
            boxSizing: 'border-box',
            position: 'absolute',
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
        position: 'relative',
      }}
    >
      {gridCells}

      {localItems
        .filter(item => item.positionX !== null && item.positionY !== null)
        .map((item, index) => {
          const left = item.positionX * 150;
          const top = item.positionY * 150;

          return (
            <div
              key={index}
              style={{
                position: 'absolute',
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
