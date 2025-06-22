import './items.css';

function Item({ item, onDragStart, onDragOver, onDrop, onDragEnd, onClick, cellSize = 150, style }) {
  const {
    nameSquare,
    widthSquare,
    heightSquare,
    imageSquare,
    maxUsageSquare,
    currentUsageSquare,
    typeSquare,
    damage1Square,
    damage2Square,
    valueArmorSquare,
    pesoSquare,
  } = item;

  const widthPx = widthSquare * cellSize;
  const heightPx = heightSquare * cellSize;

  const defaultStyle = {
    width: widthPx,
    height: heightPx,
  };

  const finalStyle = style ? style : defaultStyle;

  const maxUsos = Math.min(maxUsageSquare || 0, 9); // Limita no máximo 9

  const usos = [];
  for (let i = 0; i < maxUsos; i++) {
    usos.push(
      <div
        key={i}
        className="usage-dot"
        style={{ backgroundColor: i < (currentUsageSquare || 0) ? 'black' : 'white' }}
      ></div>
    );
  }

  return (
    <div
      className="item-square"
      style={finalStyle}
      draggable
      onDragStart={(e) => onDragStart && onDragStart(e, item)}
      onDragOver={(e) => onDragOver && onDragOver(e)}
      onDrop={(e) => onDrop && onDrop(e, item)}
      onDragEnd={onDragEnd}
      onClick={onClick}
    >
      <div className="item-name">{nameSquare}</div>
      <div className="item-image-wrapper">
        <div className="item-usage">
          {usos}
        </div>
        <div className="item-info-line">
          {typeSquare || '-'} | {damage1Square || '-'} | {damage2Square || '-'} | {valueArmorSquare || '-'} | {pesoSquare || '-'}
        </div>
        <div className="item-image">
          {imageSquare ? (
            <img src={imageSquare} alt={nameSquare} />
          ) : (
            <span className="sem-imagem">[Sem imagem]</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Item;
