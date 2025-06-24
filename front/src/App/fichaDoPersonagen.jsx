import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../apiAcess';
import './FichaDoPersonagem.css';
import CharacterInventory from "../components/CharacterInventory";
import StatusBox from "../components/StatusBox";

function CharacterSheetPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

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

  const handleChange = (field, value) => {
    setCharacter(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setSaving(true);
    api.put(`/characters/${id}/`, character)
      .then(response => {
        setCharacter(response.data);
        setSaving(false);
        alert('Ficha salva com sucesso!');
      })
      .catch(error => {
        console.error('Erro ao salvar ficha:', error);
        setSaving(false);
        alert('Erro ao salvar ficha.');
      });
  };

  if (loading) return <p>Carregando ficha...</p>;
  if (error) return <p>{error}</p>;
  if (!character) return null;
  console.log('Character data:', character);
  return (
    <div className="character-sheet">
      <h2>Ficha: 
        <input
          type="text"
          value={character.nameCharacter || ''}
          onChange={(e) => handleChange('nameCharacter', e.target.value)}
        />
      </h2>

      <p><strong>Background:</strong>
        <input
          type="text"
          value={character.backgroundCharacter || ''}
          onChange={(e) => handleChange('backgroundCharacter', e.target.value)}
        />
      </p>

      <p><strong>Signo:</strong>
        <input
          type="text"
          value={character.birthsignCharacter || ''}
          onChange={(e) => handleChange('birthsignCharacter', e.target.value)}
        />
      </p>

      <p><strong>Casaco:</strong>
        <input
          type="text"
          value={character.coatCharacter || ''}
          onChange={(e) => handleChange('coatCharacter', e.target.value)}
        />
      </p>

      <p><strong>Aparência:</strong>
        <input
          type="text"
          value={character.lookCharacter || ''}
          onChange={(e) => handleChange('lookCharacter', e.target.value)}
        />
      </p>

      <h3>Atributos</h3>
      <ul>
        <li>STR: 
          <input
            type="number"
            value={character.strCurrentCharacter ?? ''}
            onChange={(e) => handleChange('strCurrentCharacter', e.target.value)}
          /> / 
          <input
            type="number"
            value={character.strMaxCharacter ?? ''}
            onChange={(e) => handleChange('strMaxCharacter', e.target.value)}
          />
        </li>
        <li>DEX: 
          <input
            type="number"
            value={character.dexCurrentCharacter ?? ''}
            onChange={(e) => handleChange('dexCurrentCharacter', e.target.value)}
          /> / 
          <input
            type="number"
            value={character.dexMaxCharacter ?? ''}
            onChange={(e) => handleChange('dexMaxCharacter', e.target.value)}
          />
        </li>
        <li>WILL: 
          <input
            type="number"
            value={character.willCurrentCharacter ?? ''}
            onChange={(e) => handleChange('willCurrentCharacter', e.target.value)}
          /> / 
          <input
            type="number"
            value={character.willMaxCharacter ?? ''}
            onChange={(e) => handleChange('willMaxCharacter', e.target.value)}
          />
        </li>
      </ul>

      <h3>Vida</h3>
      <StatusBox
        label={'HP'}
        currentValue={character.hpCurrentCharacter}
        maxValue={character.hpMaxCharacter}
        onChangeCurrent={(value) => handleChange('hpCurrentCharacter', value)}
        onChangeMax={(value) => handleChange('hpMaxCharacter', value)}
      />

      <h3>Outros</h3>
      <p>Pips: 
        <input
          type="number"
          value={character.pipsCharacter ?? ''}
          onChange={(e) => handleChange('pipsCharacter', e.target.value)}
        />
      </p>
      <p>Level: 
        <input
          type="number"
          value={character.levelCharacter ?? ''}
          onChange={(e) => handleChange('levelCharacter', e.target.value)}
        />
      </p>
      <p>XP: 
        <input
          type="number"
          value={character.xpCharacter ?? ''}
          onChange={(e) => handleChange('xpCharacter', e.target.value)}
        />
      </p>
      <p>Grit: 
        <input
          type="number"
          value={character.gritCharacter ?? ''}
          onChange={(e) => handleChange('gritCharacter', e.target.value)}
        />
      </p>

      <button onClick={handleSave} disabled={saving}>
        {saving ? 'Salvando...' : 'Salvar Ficha'}
      </button>

      <CharacterInventory characterId={id} />
    </div>
  );
}

export default CharacterSheetPage;
