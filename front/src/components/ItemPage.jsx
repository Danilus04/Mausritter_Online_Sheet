"use client";
import api from "../apiAcess";
import { useState } from "react";
import Input from "./Input" 
import Spacer from "./Spacer"
import CheckBoxInput  from "./CheckBoxInput"
import ImageInput from "./ImagemInput";

export default function ItemPageCrate() {
  const [imageFile, setImageFile] = useState(null);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      handleChange("imageSquare", file.name); // ou envie para o backend aqui
    }
  };

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

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    try {
      const response = await api.post("item/", form); // URL relativa à baseURL
      if (response.status === 201) {
        alert("Item criado com sucesso!");
      } else {
        alert("Erro ao criar item.");
      }
    } catch (error) {
      console.log("Erro ao enviar:", error);
      alert("Falha ao conectar com o servidor.");
    }
  };
  return (

    <main className="flex flex-col space-y-6 p-6 max-w-5xl mx-auto text-white">
      <div className="flex flex-wrap">
        <Input placeholder="Tipo do Item" value={form.typeSquare} onChange={v => handleChange("typeSquare", v)} />
        <Spacer size={15}/>
        <Input placeholder="Efeito Condicional" value={form.conditionEffectSquare} onChange={v => handleChange("conditionEffectSquare", v)} />
        <Spacer size={15}/>
        <Input placeholder="Efeito Principal" value={form.effectDescription} onChange={v => handleChange("effectDescription", v)} />
        <Spacer size={15}/>
        <Input placeholder="Descrição Detalhada" value={form.descriptionSquare} onChange={v => handleChange("descriptionSquare", v)} />
        <Spacer size={15}/>
        <Input placeholder="Cor Predominante" value={form.colorSquare} onChange={v => handleChange("colorSquare", v)} />
        <Spacer size={15}/>
        <Input placeholder="Nome do Item" value={form.nameSquare} onChange={v => handleChange("nameSquare", v)}/>
        <Spacer size={15}/>
        <Input placeholder="Tipo de Uso" value={form.usageTypeSquare} onChange={v => handleChange("usageTypeSquare", v)} />
        <Spacer size={15}/>
        <Input placeholder="Tag (para busca)" value={form.tagSquare} onChange={v => handleChange("tagSquare", v)} />
        <Spacer size={15}/>
        <Input placeholder="Uso Atual" type="number" value={form.currentUsageSquare} onChange={v => handleChange("currentUsageSquare", +v)} />
        <Spacer size={16}/>
        <Input placeholder="Uso Máximo" type="number" value={form.maxUsageSquare} onChange={v => handleChange("maxUsageSquare", +v)} />
        <Spacer size={15}/>
        <Input placeholder="Peso (em Kg)" type="number" value={form.pesoSquare} onChange={v => handleChange("pesoSquare", +v)} />
        <Spacer size={15}/>
        <Input placeholder="Valor (em moedas)" type="number" value={form.worthSquare} onChange={v => handleChange("worthSquare", +v)} />
        <Spacer size={15}/>
        <Input placeholder="Dano Primário" value={form.damage1Square} onChange={v => handleChange("damage1Square", v)} />
        <Spacer size={15}/>
        <Input placeholder="Dano Secundário" value={form.damage2Square} onChange={v => handleChange("damage2Square", v)} />
        <Spacer size={15}/>
        <Input placeholder="Valor da Armadura/Defesa" type="number" value={form.valueArmorSquare} onChange={v => handleChange("valueArmorSquare", +v)} />
        <Spacer size={25}/>
      <CheckBoxInput label="Este item é mágico?" checked={form.isMagical} onChange={(value) => handleChange("isMagical", value)}/>
      <Spacer size={25}/>
      <ImageInput onChange={handleImageChange} label="Salvar Imagem"/> 
      <Spacer size={25}/>
      <ImageInput label="Cadastrar Item" onClick={handleSubmit} /> 
      </div>      

    </main>
  );
}


