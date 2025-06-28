"use client";
import api from "../apiAcess";
import { useState } from "react";
import Input from "./Input";
import Spacer from "./Spacer";
import CheckBoxInput from "./CheckBoxInput";
import ImageInput from "./ImagemInput";
import './styles/ItemPage.css';

export default function ItemPageCreateWithFullState() {

  // 1. O estado 'form' é mantido exatamente como você pediu.
  const [form, setForm] = useState({
    nameSquare: "",
    colorSquare: "",
    widthSquare: 1,
    heightSquare: 1,
    descriptionSquare: "",
    effectDescription: "",
    typeSquare: "",
    imageSquare: "",
    worthSquare: 0,
    currentUsageSquare: 0,
    maxUsageSquare: 0,
    tagSquare: "",
    damage1Square: "",
    damage2Square: "",
    valueArmorSquare: 0,
    conditionEffectSquare: "",
    usageTypeSquare: "",
    isMagical: false,
    pesoSquare: 0,
  });

  // Estado para o template e para o arquivo de imagem
  const [template, setTemplate] = useState("livre");
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      handleChange("imageSquare", file.name);
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    let payload = {};

    // Campos obrigatórios para todos os templates
    payload.nameSquare = form.nameSquare;
    payload.imageSquare = form.imageSquare;
    payload.worthSquare = form.worthSquare;
    payload.colorSquare = form.colorSquare;
    payload.tagSquare = form.tagSquare;
    payload.typeSquare = template;

    // Adiciona campos específicos baseado no template, puxando do 'form'
    switch (template) {
      case "arma":
        payload.damage1Square = form.damage1Square;
        payload.damage2Square = form.damage2Square;
        payload.usageTypeSquare = form.usageTypeSquare;
        payload.currentUsageSquare = form.currentUsageSquare;
        payload.maxUsageSquare = form.maxUsageSquare;
        payload.descriptionSquare = form.descriptionSquare;
        payload.pesoSquare = form.pesoSquare;
        payload.isMagical = form.isMagical;
        break;
      case "armadura":
        payload.valueArmorSquare = form.valueArmorSquare;
        payload.usageTypeSquare = form.usageTypeSquare;
        payload.currentUsageSquare = form.currentUsageSquare;
        payload.maxUsageSquare = form.maxUsageSquare;
        payload.descriptionSquare = form.descriptionSquare;
        payload.pesoSquare = form.pesoSquare;
        payload.isMagical = form.isMagical;
        break;
      case "feitiço":
        payload.effectDescription = form.effectDescription;
        payload.usageTypeSquare = form.usageTypeSquare;
        payload.currentUsageSquare = form.currentUsageSquare;
        payload.maxUsageSquare = form.maxUsageSquare;
        payload.descriptionSquare = form.descriptionSquare;
        payload.isMagical = form.isMagical;
        break;
      case "condição":
        payload.descriptionSquare = form.descriptionSquare;
        payload.conditionEffectSquare = form.conditionEffectSquare;
        break;
      case "livre":
        // No modo livre, o payload é o formulário inteiro.
        payload = { ...form, typeSquare: 'livre' };
        break;
    }

    // Adiciona os campos do payload e o arquivo ao FormData
    for (const key in payload) {
      formData.append(key, payload[key]);
    }
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    try {
      const response = await api.post("item/", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status === 201) alert("Item criado com sucesso!");
      else alert("Erro ao criar item.");
    } catch (error) {
      console.log("Erro ao enviar:", error);
      alert("Falha ao conectar com o servidor.");
    }
  };

  return (
    <main className="item-form-container">
      <div className="input-group">
        
        <label htmlFor="template-select">Template do Item</label>
        <select id="template-select" value={template} onChange={e => setTemplate(e.target.value)} className="template-select">
          <option value="livre">Livre</option>
          <option value="arma">Arma</option>
          <option value="armadura">Armadura</option>
          <option value="feitiço">Feitiço</option>
          <option value="condição">Condição</option>
        </select>
        <Spacer size={20} />

        
        <Input placeholder="Nome do Item" value={form.nameSquare} onChange={v => handleChange("nameSquare", v)} />
        <Input placeholder="Tag (para busca)" value={form.tagSquare} onChange={v => handleChange("tagSquare", v)} />
        
        {template === 'livre' && (
            <>
              <Input placeholder="Largura (Grid)" type="number" value={form.widthSquare} onChange={v => handleChange("widthSquare", +v)} />
              <Input placeholder="Altura (Grid)" type="number" value={form.heightSquare} onChange={v => handleChange("heightSquare", +v)} />
            </>
        )}

        {(template === 'arma' || template === 'livre') && (
          <>
            <Input placeholder="Dano Primário" value={form.damage1Square} onChange={v => handleChange("damage1Square", v)} />
            <Input placeholder="Dano Secundário" value={form.damage2Square} onChange={v => handleChange("damage2Square", v)} />
          </>
        )}
        
        {(template === 'feitiço' || template === 'livre') && (
            <Input placeholder="Efeito Principal" value={form.effectDescription} onChange={v => handleChange("effectDescription", v)} />
        )}

        {(template === 'condição' || template === 'livre') && (
            <Input placeholder="Efeito da Condição" value={form.conditionEffectSquare} onChange={v => handleChange("conditionEffectSquare", v)} />
        )}

        <Input placeholder="Descrição Detalhada" value={form.descriptionSquare} onChange={v => handleChange("descriptionSquare", v)} />
        <Spacer size={10}/>

        {(['arma', 'armadura', 'feitiço', 'livre'].includes(template)) && (
          <>
            <Input placeholder="Uso Atual" type="number" value={form.currentUsageSquare} onChange={v => handleChange("currentUsageSquare", +v)} />
            <Input placeholder="Uso Máximo" type="number" value={form.maxUsageSquare} onChange={v => handleChange("maxUsageSquare", +v)} />
            <Input placeholder="Tipo de Uso" value={form.usageTypeSquare} onChange={v => handleChange("usageTypeSquare", v)} />
            <Input placeholder="Cor Predominante" value={form.colorSquare} onChange={v => handleChange("colorSquare", v)} />
          </>
        )}

        {(template === 'armadura' || template === 'livre') && (
          <Input placeholder="Valor da Armadura/Defesa" type="number" value={form.valueArmorSquare} onChange={v => handleChange("valueArmorSquare", +v)} />
        )}
        
        {(['arma', 'armadura', 'livre'].includes(template)) && (
          <Input placeholder="Peso (slots)" type="number" value={form.pesoSquare} onChange={v => handleChange("pesoSquare", +v)} />
        )}

        <Input placeholder="Valor (pips)" type="number" value={form.worthSquare} onChange={v => handleChange("worthSquare", +v)} />
        <Spacer size={1}/>

        {(['arma', 'armadura', 'feitiço', 'livre'].includes(template)) && (
            <CheckBoxInput label="Este item é mágico?" checked={form.isMagical} onChange={(value) => handleChange("isMagical", value)}/>
        )}

        <Spacer size={1}/>
        <ImageInput onChange={handleImageChange} label="Selecionar Imagem do Item" /> 
        
        
        {/* <Button label="Cadastrar Item" onClick={handleSubmit} /> */}
      </div>
    </main>
  );
}