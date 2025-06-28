"use client";
import api from "../../apiAcess"
import { useState } from "react";
import "../styles/ItemPage.css";
import Dropdown from "../ui/Dropdown";
import ImageInput from "../ui/ImagemInput";
import Input from "../ui/Input";
import Spacer from "../ui/Spacer";
import { templateOptions } from "./Item-form-options";
import TemplateRenderer from "./template-render";
import SubmitButton from "../ui/SubmitButton";

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
  const [imageFile, setImageFile] = useState(null);

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

  const handleSubmit = async (event) => {
    // 1. Previne o comportamento padrão do formulário (recarregar a página)
    event.preventDefault();

    // Opcional: Log para depuração, para ver o que está sendo enviado
    console.log("Iniciando envio para o backend com o template:", template);

    // 2. Monta o objeto FormData que permite o envio de arquivos (imagem)
    const formData = new FormData();

    // 3. Define o payload inicial com os campos comuns a todos os templates
    let payload = {
      nameSquare: form.nameSquare,
      imageSquare: form.imageSquare,
      worthSquare: form.worthSquare,
      colorSquare: form.colorSquare,
      tagSquare: form.tagSquare,
      typeSquare: template,
    };

    // 4. Adiciona os campos específicos de cada template ao payload
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
        // No modo livre, o payload inclui todos os campos do formulário
        payload = { ...form, typeSquare: "livre" };
        break;
    }

    // 5. Adiciona cada item do payload final ao objeto FormData
    for (const key in payload) {
      formData.append(key, payload[key]);
    }
    // Adiciona o arquivo da imagem, se ele existir
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    // 6. Envia os dados para o backend dentro de um bloco try/catch
    try {
      // O 'api.post' envia o FormData para o endpoint 'item/' do seu servidor
      const response = await api.post("item/", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Essencial para envio de arquivos
        },
      });

      if (response.status === 201) {
        alert("Item criado com sucesso!");
        // Opcional: Limpar o formulário ou redirecionar o usuário após o sucesso
      } else {
        // Trata respostas que não são de sucesso (ex: status 400, 500)
        alert(`Erro ao criar item: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Falha na comunicação com o servidor:", error);
      alert("Falha ao conectar com o servidor. Verifique o console para mais detalhes.");
    }
  };

  return (
    <main className="item-form-container">
      {/* 1. A tag <form> envolve todos os campos e aciona o handleSubmit */}
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

          <ImageInput onChange={handleImageChange} label="Selecionar Imagem do Item" />
          <Spacer size={20} />

          <SubmitButton label="Cadastrar Item" />
        </div>
      </form>
    </main>
  );
}
