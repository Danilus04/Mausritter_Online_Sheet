"use client";
import { useState } from "react";
import api from "../../apiAcess";
import "../styles/ItemPage.css";
import Dropdown from "../ui/Dropdown";
import Input from "../ui/Input";
import Spacer from "../ui/Spacer";
import SubmitButton from "../ui/SubmitButton";
import { templateOptions } from "./Item-form-options";
import TemplateRenderer from "./template-render";

export default function ItemCreationPage() {
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
  const [template, setTemplate] = useState("livre");

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    // Previne o recarregamento da página
    event.preventDefault();

    // 1. Monta o objeto 'payload' com os dados do formulário.
    //    O campo 'imageSquare' agora contém a URL que o usuário digitou.
    let payload = {
      nameSquare: form.nameSquare,
      imageSquare: form.imageSquare, // Esta é a URL da imagem
      worthSquare: form.worthSquare,
      colorSquare: form.colorSquare,
      tagSquare: form.tagSquare,
      typeSquare: template,
    };

    // 2. Adiciona os campos específicos de cada template
    switch (template) {
      case "arma":
        payload = {
          ...payload,
          damage1Square: form.damage1Square,
          damage2Square: form.damage2Square,
          usageTypeSquare: form.usageTypeSquare,
          currentUsageSquare: form.currentUsageSquare,
          maxUsageSquare: form.maxUsageSquare,
          descriptionSquare: form.descriptionSquare,
          pesoSquare: form.pesoSquare,
          isMagical: form.isMagical,
        };
        break;
      case "armadura":
        payload = {
          ...payload,
          valueArmorSquare: form.valueArmorSquare,
          usageTypeSquare: form.usageTypeSquare,
          currentUsageSquare: form.currentUsageSquare,
          maxUsageSquare: form.maxUsageSquare,
          descriptionSquare: form.descriptionSquare,
          pesoSquare: form.pesoSquare,
          isMagical: form.isMagical,
        };
        break;
      case "feitiço":
        payload = {
          ...payload,
          effectDescription: form.effectDescription,
          usageTypeSquare: form.usageTypeSquare,
          currentUsageSquare: form.currentUsageSquare,
          maxUsageSquare: form.maxUsageSquare,
          descriptionSquare: form.descriptionSquare,
          isMagical: form.isMagical,
        };
        break;
      case "condição":
        payload = { ...payload, descriptionSquare: form.descriptionSquare, conditionEffectSquare: form.conditionEffectSquare };
        break;
      case "livre":
        payload = { ...form, typeSquare: "livre" };
        break;
    }

    try {
      const response = await api.post("item/", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        alert("Item criado com sucesso!");
      } else {
        alert(`Erro ao criar item: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Falha na comunicação com o servidor:", error);
      alert("Falha ao conectar com o servidor.");
    }
  };

  return (
    <main className="item-form-container">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <Dropdown
            label="Template do Item"
            value={template}
            onChange={setTemplate}
            options={templateOptions}
            className="dropdown-template-style"
          />
          <Input placeholder="Nome do Item" value={form.nameSquare} onChange={(v) => handleChange("nameSquare", v)} />
          <Input placeholder="Tag (para busca)" value={form.tagSquare} onChange={(v) => handleChange("tagSquare", v)} />
          <Spacer size={10} />

          <TemplateRenderer template={template} form={form} handleChange={handleChange} />

          <Spacer size={10} />
          <Input placeholder="Valor (pips)" type="number" value={form.worthSquare} onChange={(v) => handleChange("worthSquare", +v)} />
          <Input placeholder="Cor Predominante (ex: #c4a68a)" value={form.colorSquare} onChange={(v) => handleChange("colorSquare", v)} />
          <Spacer size={20} />

          <Input
            placeholder="URL da Imagem"
            value={form.imageSquare} // Já está no seu estado 'form'
            onChange={(v) => handleChange("imageSquare", v)} // Usa a função 'handleChange' padrão
          />
          <Spacer size={20} />

          <SubmitButton label="Cadastrar Item" />
        </div>
      </form>
    </main>
  );
}
