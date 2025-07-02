export default function AddToCharacterDropdown({ show, characters, item, onAdd }) {
  if (!show) return null;

  return (
    <div>
      {characters.length === 0 ? (
        <div>Nenhum personagem</div>
      ) : (
        characters.map((char) => (
          <div key={char.id} onClick={() => onAdd(char.id, char.nameCharacter, item)}>
            {char.nameCharacter || `Ficha ${char.id}`}
          </div>
        ))
      )}
    </div>
  );
}
