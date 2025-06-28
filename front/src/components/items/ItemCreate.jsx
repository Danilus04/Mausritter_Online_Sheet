"use client";
import { useState } from "react";
import api from "../../apiAcess";
import CheckBoxInput from "../ui/CheckBoxInput";
import Dropdown from "../ui/Dropdown";
import ImageInput from "../ui/ImagemInput";
import Input from "../ui/Input";
import Spacer from "../ui/Spacer";
// import Button from "./Button"; // Recomendo usar um componente Button
import "../styles/ItemPage.css";

// Opções para os dropdowns
const templateOptions = [
  { value: "livre", label: "Livre" },
  { value: "arma", label: "Arma" },
  { value: "armadura", label: "Armadura" },
  { value: "feitiço", label: "Feitiço" },
  { value: "condição", label: "Condição" },
];

const usageTypeOptions = [
  { value: "", label: "Selecione um tipo..." },
  { value: "uma_mao", label: "Uma Mão" },
  { value: "duas_maos", label: "Duas Mãos" },
  { value: "corpo", label: "Corpo" },
  { value: "cabeca", label: "Cabeça" },
  { value: "consumivel", label: "Consumível" },
];

// Novas opções para Largura e Altura
const widthOptions = [
  { value: 1, label: "1 Slot" },
  { value: 2, label: "2 Slots" },
  { value: 3, label: "3 Slots" },
  { value: 4, label: "4 Slots" },
  { value: 5, label: "5 Slots" },
];

const heightOptions = [
  { value: 1, label: "1 Slot" },
  { value: 2, label: "2 Slots" },
];

export default function ItemPageCreateWithCase() {
  // --- Estados ---
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
  const [imageFile, setImageFile] = useState(null);

  // --- Handlers ---
  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
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
    // A lógica de construção do payload continua a mesma
    let payload = {
      nameSquare: form.nameSquare,
      imageSquare: form.imageSquare,
      worthSquare: form.worthSquare,
      colorSquare: form.colorSquare,
      tagSquare: form.tagSquare,
      typeSquare: template,
    };
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
        payload = {
          ...payload,
          descriptionSquare: form.descriptionSquare,
          conditionEffectSquare: form.conditionEffectSquare,
        };
        break;
      case "livre":
        payload = { ...form, typeSquare: "livre" };
        break;
    }
    for (const key in payload) {
      formData.append(key, payload[key]);
    }
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }
    try {
      const response = await api.post("item/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 201) alert("Item criado com sucesso!");
      else alert("Erro ao criar item.");
    } catch (error) {
      console.log("Erro ao enviar:", error);
      alert("Falha ao conectar com o servidor.");
    }
  };

  const renderTemplateFields = () => {
    switch (template) {
      case "arma":
      case "armadura":
      case "feitiço":
        // Agrupamos os campos comuns a Arma, Armadura e Feitiço
        return (
          <>
            {template === "arma" && (
              <>
                <div className="form-row">
                  <Dropdown
                    label="Largura no Inventário"
                    value={form.widthSquare}
                    onChange={(v) => handleChange("widthSquare", +v)}
                    options={widthOptions}
                  />
                  <Dropdown
                    label="Altura no Inventário"
                    value={form.heightSquare}
                    onChange={(v) => handleChange("heightSquare", +v)}
                    options={heightOptions}
                  />
                </div>
                <Input placeholder="Dano Primário" value={form.damage1Square} onChange={(v) => handleChange("damage1Square", v)} />
                <Input placeholder="Dano Secundário" value={form.damage2Square} onChange={(v) => handleChange("damage2Square", v)} />
                <Input
                  as="textarea"
                  className="input-descricao-grande"
                  placeholder="Descrição Detalhada"
                  value={form.descriptionSquare}
                  onChange={(v) => handleChange("descriptionSquare", v)}
                />
              </>
            )}
            {template === "armadura" && (
              <>
                <div className="form-row">
                  <Dropdown
                    label="Largura no Inventário"
                    value={form.widthSquare}
                    onChange={(v) => handleChange("widthSquare", +v)}
                    options={widthOptions}
                  />
                  <Dropdown
                    label="Altura no Inventário"
                    value={form.heightSquare}
                    onChange={(v) => handleChange("heightSquare", +v)}
                    options={heightOptions}
                  />
                </div>
                <Input
                  placeholder="Valor da Armadura/Defesa"
                  type="number"
                  value={form.valueArmorSquare}
                  onChange={(v) => handleChange("valueArmorSquare", +v)}
                />
                <Input placeholder="Peso (slots)" type="number" value={form.pesoSquare} onChange={(v) => handleChange("pesoSquare", +v)} />
                <Input
                  as="textarea"
                  className="input-descricao-grande"
                  placeholder="Descrição Detalhada"
                  value={form.descriptionSquare}
                  onChange={(v) => handleChange("descriptionSquare", v)}
                />
              </>
            )}
            {template === "feitiço" && (
              <>
                <div className="form-row">
                  <Dropdown
                    label="Largura no Inventário"
                    value={form.widthSquare}
                    onChange={(v) => handleChange("widthSquare", +v)}
                    options={widthOptions}
                  />
                  <Dropdown
                    label="Altura no Inventário"
                    value={form.heightSquare}
                    onChange={(v) => handleChange("heightSquare", +v)}
                    options={heightOptions}
                  />
                </div>
                <Input
                  placeholder="Efeito Principal do Feitiço"
                  value={form.effectDescription}
                  onChange={(v) => handleChange("effectDescription", v)}
                />
                <Spacer size={1} />
                <Input
                  as="textarea"
                  className="input-descricao-grande"
                  placeholder="Descrição Detalhada"
                  value={form.descriptionSquare}
                  onChange={(v) => handleChange("descriptionSquare", v)}
                />
              </>
            )}

            {/* Wrapper div para layout lado a lado */}
            <div className="form-row">
              <Dropdown
                label="Tipo de Uso"
                value={form.usageTypeSquare}
                onChange={(v) => handleChange("usageTypeSquare", v)}
                options={usageTypeOptions}
              />
              <CheckBoxInput label="Este item é mágico?" checked={form.isMagical} onChange={(v) => handleChange("isMagical", v)} />
            </div>

            <Input
              placeholder="Uso Atual"
              type="number"
              value={form.currentUsageSquare}
              onChange={(v) => handleChange("currentUsageSquare", +v)}
            />
            <Input placeholder="Uso Máximo" type="number" value={form.maxUsageSquare} onChange={(v) => handleChange("maxUsageSquare", +v)} />
          </>
        );

      case "condição":
        return (
          <>
            <div className="form-row">
              <Dropdown
                label="Largura no Inventário"
                value={form.widthSquare}
                onChange={(v) => handleChange("widthSquare", +v)}
                options={widthOptions}
              />
              <Dropdown
                label="Altura no Inventário"
                value={form.heightSquare}
                onChange={(v) => handleChange("heightSquare", +v)}
                options={heightOptions}
              />
            </div>
            <Input
              placeholder="Efeito da Condição"
              value={form.conditionEffectSquare}
              onChange={(v) => handleChange("conditionEffectSquare", v)}
            />
            <Spacer size={1} />
            <Input
              as="textarea"
              className="input-descricao-grande"
              placeholder="Descrição Detalhada"
              value={form.descriptionSquare}
              onChange={(v) => handleChange("descriptionSquare", v)}
            />
            <Spacer size={1} />
          </>
        );

      case "livre":
        return (
          <>
            {/* Todos os campos para o modo livre */}
            <div className="form-row">
              <Dropdown
                label="Largura no Inventário"
                value={form.widthSquare}
                onChange={(v) => handleChange("widthSquare", +v)}
                options={widthOptions}
              />
              <Dropdown
                label="Altura no Inventário"
                value={form.heightSquare}
                onChange={(v) => handleChange("heightSquare", +v)}
                options={heightOptions}
              />
            </div>
            <Input placeholder="Dano Primário" value={form.damage1Square} onChange={(v) => handleChange("damage1Square", v)} />
            <Input placeholder="Dano Secundário" value={form.damage2Square} onChange={(v) => handleChange("damage2Square", v)} />
            <Input
              placeholder="Efeito Principal do Feitiço"
              value={form.effectDescription}
              onChange={(v) => handleChange("effectDescription", v)}
            />
            <Input
              placeholder="Efeito da Condição"
              value={form.conditionEffectSquare}
              onChange={(v) => handleChange("conditionEffectSquare", v)}
            />
            <Input
              placeholder="Valor da Armadura/Defesa"
              type="number"
              value={form.valueArmorSquare}
              onChange={(v) => handleChange("valueArmorSquare", +v)}
            />
            <Input placeholder="Peso (slots)" type="number" value={form.pesoSquare} onChange={(v) => handleChange("pesoSquare", +v)} />
            <Input
              as="textarea"
              className="input-descricao-grande"
              placeholder="Descrição Detalhada"
              value={form.descriptionSquare}
              onChange={(v) => handleChange("descriptionSquare", v)}
            />
            <div className="form-row">
              <Dropdown
                label="Tipo de Uso"
                value={form.usageTypeSquare}
                onChange={(v) => handleChange("usageTypeSquare", v)}
                options={usageTypeOptions}
              />
              <CheckBoxInput label="Este item é mágico?" checked={form.isMagical} onChange={(v) => handleChange("isMagical", v)} />
            </div>
            <Input
              placeholder="Uso Atual"
              type="number"
              value={form.currentUsageSquare}
              onChange={(v) => handleChange("currentUsageSquare", +v)}
            />
            <Input placeholder="Uso Máximo" type="number" value={form.maxUsageSquare} onChange={(v) => handleChange("maxUsageSquare", +v)} />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <main className="item-form-container">
      <div className="input-group">
        <Dropdown
          label="Template do Item"
          value={template}
          onChange={setTemplate}
          options={templateOptions}
          className="dropdown-template-style" /* <<-- AQUI A ALTERAÇÃO */
        />
        <Input placeholder="Nome do Item" value={form.nameSquare} onChange={(v) => handleChange("nameSquare", v)} />
        <Input placeholder="Tag (para busca)" value={form.tagSquare} onChange={(v) => handleChange("tagSquare", v)} />

        {renderTemplateFields()}

        <Input placeholder="Valor (pips)" type="number" value={form.worthSquare} onChange={(v) => handleChange("worthSquare", +v)} />
        <Input placeholder="Cor Predominante (ex: #c4a68a)" value={form.colorSquare} onChange={(v) => handleChange("colorSquare", v)} />

        <Spacer size={1} />
        <ImageInput onChange={handleImageChange} label="Selecionar Imagem do Item" />
        {/* <button label="Cadastrar Item" onClick={handleSubmit} /> */}
      </div>
    </main>
  );
}
