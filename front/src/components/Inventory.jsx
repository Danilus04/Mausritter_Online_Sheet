import Item from './items';
import './inventory.css';
import { useState } from 'react';

function Inventory({ items, gridWidth, gridHeight }) {
  const [localItems, setLocalItems] = useState(items);
  const [draggingItem, setDraggingItem] = useState(null);

  const handleDragStart = (e, item) => {
    setDraggingItem(item);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Permite o drop
  };

  const handleDrop = (e, targetX, targetY) => {
    if (!draggingItem) return;

    // Atualiza a posição do item arrastado
    const updatedItems = localItems.map((it) => {
      if (it === draggingItem) {
        return { ...it, positionX: targetX, positionY: targetY };
      }
      return it;
    });

    setLocalItems(updatedItems);
    setDraggingItem(null);
  };

  // Gera as células do grid para receber drops
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
      className="inventory-grid"
      style={{
        width: gridWidth * 150,
        height: gridHeight * 150,
        position: 'relative',
      }}
    >
      {gridCells}

      {localItems.map((item, index) => {
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
            />
          </div>
        );
      })}
    </div>
  );
}

export default Inventory;
