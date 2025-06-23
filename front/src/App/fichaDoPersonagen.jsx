import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../apiAcess';
import './CharacterSheetPage.css';  // Arquivo de estilos opcional

function CharacterSheetPage() {
  const { id } = useParams();  // Captura o ID da ficha da URL
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/characters/${id}/`)
      .then(response => {
        setCharacter(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erro ao carregar a ficha:', error);
        setError('Não foi possível carregar a ficha.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Carregando ficha...</p>;
  if (error) return <p>{error}</p>;
  if (!character) return null;

  return (
    <div className="character-sheet">
      <h2>Ficha: {character.nameCharacter}</h2>
      <p><strong>Background:</strong> {character.backgroundCharacter}</p>
      <p><strong>Signo:</strong> {character.birthsignCharacter}</p>
      <p><strong>Casaco:</strong> {character.coatCharacter}</p>
      <p><strong>Aparência:</strong> {character.lookCharacter}</p>

      <h3>Atributos</h3>
      <ul>
        <li>STR: {character.strCurrentCharacter} / {character.strMaxCharacter}</li>
        <li>DEX: {character.dexCurrentCharacter} / {character.dexMaxCharacter}</li>
        <li>WILL: {character.willCurrentCharacter} / {character.willMaxCharacter}</li>
      </ul>

      <h3>Vida</h3>
      <p>HP: {character.hpCurrentCharacter} / {character.hpMaxCharacter}</p>

      <h3>Outros</h3>
      <p>Pips: {character.pipsCharacter}</p>
      <p>Level: {character.levelCharacter}</p>
      <p>XP: {character.xpCharacter}</p>
      <p>Grit: {character.gritCharacter}</p>
    </div>
  );
}

export default CharacterSheetPage;
