"use client";
import { useState, useEffect } from "react";
import api from "../apiAcess";
import Input from "./Input";
import Spacer from "./Spacer";
import CheckBoxInput from "./CheckBoxInput";
import ImageInput from "./ImagemInput";

export default function ItemPageEdit({ item }) {
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

  // Atualiza form quando item chegar/alterar
  useEffect(() => {
    if (!item) return;
    setForm({
      nameSquare: item.nameSquare || "",
      colorSquare: item.colorSquare || "",
      widthSquare: item.widthSquare || 1,
      heightSquare: item.heightSquare || 1,
      descriptionSquare: item.descriptionSquare || "",
      effectDescription: item.effectDescription || "",
      typeSquare: item.typeSquare || "",
      imageSquare: item.imageSquare || "",
      worthSquare: item.worthSquare || 0,
      currentUsageSquare: item.currentUsageSquare || 0,
      maxUsageSquare: item.maxUsageSquare || 0,
      tagSquare: item.tagSquare || "",
      damage1Square: item.damage1Square || "",
      damage2Square: item.damage2Square || "",
      valueArmorSquare: item.valueArmorSquare || 0,
      conditionEffectSquare: item.conditionEffectSquare || "",
      usageTypeSquare: item.usageTypeSquare || "",
      isMagical: item.isMagical || false,
      pesoSquare: item.pesoSquare || 0,
    });
  }, [item]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Você pode enviar direto ou só atualizar o nome
      handleChange("imageSquare", file.name);
    }
  };

  
  const handleSubmit = async () => {
    
    try {
      const response = await api.put(`item/${item.idSquare}/`, form);
      
      if (response.status === 200) {
        alert("Item atualizado com sucesso!");
      } else {
        alert("Erro ao atualizar item.");
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      alert("Falha ao conectar com o servidor.");
    }
  };

  if (!item) return <p>Carregando item para edição...</p>;

  return (
    <main className="flex flex-col space-y-6 p-6 max-w-5xl mx-auto text-white">
      <div className="flex flex-wrap">
        <Input
          placeholder="Tipo do Item"
          value={form.typeSquare}
          onChange={(v) => handleChange("typeSquare", v)}
        />
        <Spacer size={15} />
        <Input
          placeholder="Efeito Condicional"
          value={form.conditionEffectSquare}
          onChange={(v) => handleChange("conditionEffectSquare", v)}
        />
        <Spacer size={15} />
        <Input
          placeholder="Efeito Principal"
          value={form.effectDescription}
          onChange={(v) => handleChange("effectDescription", v)}
        />
        <Spacer size={15} />
        <Input
          placeholder="Descrição Detalhada"
          value={form.descriptionSquare}
          onChange={(v) => handleChange("descriptionSquare", v)}
        />
        <Spacer size={15} />
        <Input
          placeholder="Cor Predominante"
          value={form.colorSquare}
          onChange={(v) => handleChange("colorSquare", v)}
        />
        <Spacer size={15} />
        <Input
          placeholder="Nome do Item"
          value={form.nameSquare}
          onChange={(v) => handleChange("nameSquare", v)}
        />
        <Spacer size={15} />
        <Input
          placeholder="Tipo de Uso"
          value={form.usageTypeSquare}
          onChange={(v) => handleChange("usageTypeSquare", v)}
        />
        <Spacer size={15} />
        <Input
          placeholder="Tag (para busca)"
          value={form.tagSquare}
          onChange={(v) => handleChange("tagSquare", v)}
        />
        <Spacer size={15} />
        <Input
          placeholder="Uso Atual"
          type="number"
          value={form.currentUsageSquare}
          onChange={(v) => handleChange("currentUsageSquare", +v)}
        />
        <Spacer size={15} />
        <Input
          placeholder="Uso Máximo"
          type="number"
          value={form.maxUsageSquare}
          onChange={(v) => handleChange("maxUsageSquare", +v)}
        />
        <Spacer size={15} />
        <Input
          placeholder="Peso (em Kg)"
          type="number"
          value={form.pesoSquare}
          onChange={(v) => handleChange("pesoSquare", +v)}
        />
        <Spacer size={15} />
        <Input
          placeholder="Valor (em moedas)"
          type="number"
          value={form.worthSquare}
          onChange={(v) => handleChange("worthSquare", +v)}
        />
        <Spacer size={15} />
        <Input
          placeholder="Dano Primário"
          value={form.damage1Square}
          onChange={(v) => handleChange("damage1Square", v)}
        />
        <Spacer size={15} />
        <Input
          placeholder="Dano Secundário"
          value={form.damage2Square}
          onChange={(v) => handleChange("damage2Square", v)}
        />
        <Spacer size={15} />
        <Input
          placeholder="Valor da Armadura/Defesa"
          type="number"
          value={form.valueArmorSquare}
          onChange={(v) => handleChange("valueArmorSquare", +v)}
        />
        <Spacer size={25} />
        <CheckBoxInput
          label="Este item é mágico?"
          checked={form.isMagical}
          onChange={(value) => handleChange("isMagical", value)}
        />
        <Spacer size={25} />
        <ImageInput onChange={handleImageChange} label="Salvar Imagem" />
        <Spacer size={25} />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 px-6 py-3 rounded text-white font-bold hover:bg-blue-700"
        >
          Atualizar Item
        </button>
      </div>
    </main>
  );
}
