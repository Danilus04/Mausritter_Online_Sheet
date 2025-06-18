import './items.css'

function Item({ item, onDragStart, onDragOver, onDrop }) {
  const {
    nameSquare,
    widthSquare,
    heightSquare,
    imageSquare,
    maxUsageSquare,
    currentUsageSquare,
    positionX,
    positionY,
  } = item;

  const widthPx = widthSquare * 150;
  const heightPx = heightSquare * 150;

  const usos = [];
  for (let i = 0; i < maxUsageSquare; i++) {
    usos.push(
      <div
        key={i}
        className="usage-dot"
        style={{ backgroundColor: i < currentUsageSquare ? 'black' : 'white' }}
      ></div>
    );
  }

  return (
    <div
      className="item-square"
      style={{ width: widthPx, height: heightPx }}
      draggable
      onDragStart={(e) => onDragStart(e, item)}
      onDragOver={(e) => onDragOver(e)}
      onDrop={(e) => onDrop(e, item)}
    >
      <div className="item-name">{nameSquare}</div>
      <div className="item-usage">{usos}</div>
      <div className="item-image">
        {imageSquare ? (
          <img src={imageSquare} alt={nameSquare} />
        ) : (
          <span className="sem-imagem">[Sem imagem]</span>
        )}
      </div>
    </div>
  );
}

export default Item;

