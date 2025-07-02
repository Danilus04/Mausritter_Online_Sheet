import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../apiAcess';
import './FichaDoPersonagem.css';
import OffGridItemManager from '../components/OffGridItemManager';
import CharacterInventory from "../components/CharacterInventory";
import StatusBox from "../components/StatusBox";
import AttributeInput from "../components/AttributeInput";
import ErrorMessage from "../components/ErrorMessage";
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
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!character) return null;

  return (
    <div className="character-sheet">
      <h2>
        Ficha:
        <input
          className="character-name-input"
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
      <ul style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <AttributeInput
          label="STR"
          current={character.strCurrentCharacter}
          max={character.strMaxCharacter}
          onChangeCurrent={(val) => handleChange('strCurrentCharacter', val)}
          onChangeMax={(val) => handleChange('strMaxCharacter', val)}
        />
        <AttributeInput
          label="DEX"
          current={character.dexCurrentCharacter}
          max={character.dexMaxCharacter}
          onChangeCurrent={(val) => handleChange('dexCurrentCharacter', val)}
          onChangeMax={(val) => handleChange('dexMaxCharacter', val)}
        />
        <AttributeInput
          label="WILL"
          current={character.willCurrentCharacter}
          max={character.willMaxCharacter}
          onChangeCurrent={(val) => handleChange('willCurrentCharacter', val)}
          onChangeMax={(val) => handleChange('willMaxCharacter', val)}
        />
      </ul>
      <div className="status-container">
      <h3>Vida</h3>
        <StatusBox
        label="HP"
        currentValue={character.hpCurrentCharacter}
        maxValue={character.hpMaxCharacter}
        onChangeCurrent={(value) => handleChange('hpCurrentCharacter', value)}
        onChangeMax={(value) => handleChange('hpMaxCharacter', value)} />
      </div>
      <h3>Outros</h3>
      <div className="other-fields">
      <div className="other-field">
      <label>Pips:</label>
      <input
        type="number"
        value={character.pipsCharacter ?? ''}
        onChange={(e) => handleChange('pipsCharacter', Number(e.target.value))}
      />
      </div>
      <div className="other-field">
      <label>Level:</label>
      <input
      type="number"
      value={character.levelCharacter ?? ''}
      onChange={(e) => handleChange('levelCharacter', Number(e.target.value))}
      />
      </div>
      <div className="other-field">
      <label>XP:</label>
      <input
        type="number"
        value={character.xpCharacter ?? ''}
        onChange={(e) => handleChange('xpCharacter', Number(e.target.value))}
      />
      </div>
      <div className="other-field">
      <label>Grit:</label>
      <input
        type="number"
        value={character.gritCharacter ?? ''}
        onChange={(e) => handleChange('gritCharacter', Number(e.target.value))}
      />
      </div>
      </div>


      <button onClick={handleSave} disabled={saving}>
        {saving ? 'Salvando...' : 'Salvar Ficha'}
      </button>

      <CharacterInventory characterId={id} />
      <OffGridItemManager characterId={id} />
    </div>
  );
}

export default CharacterSheetPage;
