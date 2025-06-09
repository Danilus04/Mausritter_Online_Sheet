  // src/components/items.jsx
  function Item({ item }) {
    const {
      nameSquare,
      imageSquare,
      typeSquare,
      damage1Square,
      usageTypeSquare,
      valueArmorSquare
    } = item

    return (
      <div className="item-card" style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
        <h3>{nameSquare}</h3>

        {imageSquare ? (
          <img src={imageSquare} alt={nameSquare} style={{ maxWidth: '100px' }} />
        ) : (
          <p><em>Sem imagem</em></p>
        )}

        {typeSquare === 'arma' && (
          <>
            <p><strong>Dano:</strong> {damage1Square || 'N/A'}</p>
            <p><strong>Tipo:</strong> {usageTypeSquare || 'N/A'}</p>
          </>
        )}

        {typeSquare === 'armadura' && (
          <p><strong>Defesa:</strong> {valueArmorSquare}</p>
        )}
      </div>
    )
  }

  export default Item
