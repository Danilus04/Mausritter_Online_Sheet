import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../apiAcess";
import CharacterInventory from "../components/CharacterInventory";
import OffGridItemManager from "../components/OffGridItemManager";
import StatusBox from "../components/StatusBox";
import Input from "../components/ui/Input";
import Spacer from "../components/ui/Spacer";
import Title from "../components/ui/Title";
import "./FichaDoPersonagem.css";

function CharacterSheetPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api
      .get(`/characters/${id}/`)
      .then((response) => {
        setCharacter(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar a ficha:", error);
        setError("Não foi possível carregar a ficha.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (field, value) => {
    setCharacter((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setSaving(true);
    api
      .put(`/characters/${id}/`, character)
      .then((response) => {
        setCharacter(response.data);
        setSaving(false);
        alert("Ficha salva com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao salvar ficha:", error);
        setSaving(false);
        alert("Erro ao salvar ficha.");
      });
  };

  if (loading) return <p>Carregando ficha...</p>;
  if (error) return <p>{error}</p>;
  if (!character) return null;

  return (
    <main>
      <Title>Ficha do Personagem</Title>

      <div className="container-form">
        <div className="input-row">
          <label>Nome:</label>
          <Input className="input-ficha" value={character.nameCharacter || ""} onChange={(v) => handleChange("nameCharacter", v)} />
        </div>

        <div className="input-row">
          <label>Background:</label>
          <Input className="input-ficha" value={character.backgroundCharacter || ""} onChange={(v) => handleChange("backgroundCharacter", v)} />
        </div>

        <div className="input-row">
          <label>Signo:</label>
          <Input className="input-ficha" value={character.birthsignCharacter || ""} onChange={(v) => handleChange("birthsignCharacter", v)} />
        </div>

        <div className="input-row">
          <label>Casaco:</label>
          <Input className="input-ficha" value={character.coatCharacter || ""} onChange={(v) => handleChange("coatCharacter", v)} />
        </div>

        <div className="input-row">
          <label>Aparência:</label>
          <Input className="input-ficha" value={character.lookCharacter || ""} onChange={(v) => handleChange("lookCharacter", v)} />
        </div>

        <Spacer size={20} />
        <h3>Atributos</h3>

        <div className="input-row">
          <label>STR:</label>
          <Input
            className="input-ficha"
            type="number"
            value={character.strCurrentCharacter ?? ""}
            onChange={(v) => handleChange("strCurrentCharacter", v)}
          />
          <span>/</span>
          <Input
            className="input-ficha"
            type="number"
            value={character.strMaxCharacter ?? ""}
            onChange={(v) => handleChange("strMaxCharacter", v)}
          />
        </div>

        <div className="input-row">
          <label>DEX:</label>
          <Input
            className="input-ficha"
            type="number"
            value={character.dexCurrentCharacter ?? ""}
            onChange={(v) => handleChange("dexCurrentCharacter", v)}
          />
          <span>/</span>
          <Input
            className="input-ficha"
            type="number"
            value={character.dexMaxCharacter ?? ""}
            onChange={(v) => handleChange("dexMaxCharacter", v)}
          />
        </div>

        <div className="input-row">
          <label>WILL:</label>
          <Input
            className="input-ficha"
            type="number"
            value={character.willCurrentCharacter ?? ""}
            onChange={(v) => handleChange("willCurrentCharacter", v)}
          />
          <span>/</span>
          <Input
            className="input-ficha"
            type="number"
            value={character.willMaxCharacter ?? ""}
            onChange={(v) => handleChange("willMaxCharacter", v)}
          />
        </div>

        <Spacer size={20} />
        <h3>Vida</h3>
        <div className="status-box-container">
          <StatusBox
            label={"HP"}
            currentValue={character.hpCurrentCharacter}
            maxValue={character.hpMaxCharacter}
            onChangeCurrent={(value) => handleChange("hpCurrentCharacter", value)}
            onChangeMax={(value) => handleChange("hpMaxCharacter", value)}
          />
        </div>

        <Spacer size={20} />
        <h3>Outros</h3>

        <div className="input-row">
          <label>Pips:</label>
          <Input
            className="input-ficha"
            type="number"
            value={character.pipsCharacter ?? ""}
            onChange={(v) => handleChange("pipsCharacter", v)}
          />
        </div>

        <div className="input-row">
          <label>Level:</label>
          <Input
            className="input-ficha"
            type="number"
            value={character.levelCharacter ?? ""}
            onChange={(v) => handleChange("levelCharacter", v)}
          />
        </div>

        <div className="input-row">
          <label>XP:</label>
          <Input className="input-ficha" type="number" value={character.xpCharacter ?? ""} onChange={(v) => handleChange("xpCharacter", v)} />
        </div>

        <div className="input-row">
          <label>Grit:</label>
          <Input
            className="input-ficha"
            type="number"
            value={character.gritCharacter ?? ""}
            onChange={(v) => handleChange("gritCharacter", v)}
          />
        </div>

        <Spacer size={20} />
        <button onClick={handleSave} disabled={saving} className="submit-button">
          {saving ? "Salvando..." : "Salvar Ficha"}
        </button>
      </div>

      <Spacer size={30} />
      <CharacterInventory characterId={id} />
      <OffGridItemManager characterId={id} />
    </main>
  );
}

export default CharacterSheetPage;
