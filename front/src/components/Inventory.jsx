import Item from './items';
import './inventory.css';

function Inventory({ items, gridWidth, gridHeight }) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridWidth}, 150px)`,
    gridTemplateRows: `repeat(${gridHeight}, 150px)`,
    gap: '4px',
    position: 'relative', // Para posicionamento absoluto dos itens
  };
  //console.log("Items:", items);
  return (
    <div className="inventory-grid" style={gridStyle}>
      {items.map((item, index) => {
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
            }}
          >
            <Item item={item} />
          </div>
        );
      })}
    </div>
  );
}

export default Inventory;
