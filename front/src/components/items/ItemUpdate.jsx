"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../apiAcess";

import Dropdown from "../ui/Dropdown"; // importe o Dropdown
import Input from "../ui/Input";
import Spacer from "../ui/Spacer";
import Title from "../ui/Title";
import { templateOptions } from "./Item-form-options"; // importe as opções
import TemplateRenderer from "./template-render"; // importe aqui

export default function ItemPageEdit() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    nameSquare: "",
    colorSquare: "#ffffff",
    widthSquare: 1,
    heightSquare: 1,
    descriptionSquare: "",
    effectDescription: "",
    typeSquare: "livre",
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

  useEffect(() => {
    api
      .get(`/item/${id}/`)
      .then((res) => {
        setForm({
          nameSquare: res.data.nameSquare || "",
          colorSquare: res.data.colorSquare || "#ffffff",
          widthSquare: res.data.widthSquare || 1,
          heightSquare: res.data.heightSquare || 1,
          descriptionSquare: res.data.descriptionSquare || "",
          effectDescription: res.data.effectDescription || "",
          typeSquare: res.data.typeSquare || "livre",
          imageSquare: res.data.imageSquare || "",
          worthSquare: res.data.worthSquare || 0,
          currentUsageSquare: res.data.currentUsageSquare || 0,
          maxUsageSquare: res.data.maxUsageSquare || 0,
          tagSquare: res.data.tagSquare || "",
          damage1Square: res.data.damage1Square || "",
          damage2Square: res.data.damage2Square || "",
          valueArmorSquare: res.data.valueArmorSquare || 0,
          conditionEffectSquare: res.data.conditionEffectSquare || "",
          usageTypeSquare: res.data.usageTypeSquare || "",
          isMagical: res.data.isMagical || false,
          pesoSquare: res.data.pesoSquare || 0,
        });
        setLoading(false);
      })
      .catch(() => {
        alert("Erro ao carregar item para edição.");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/item/${id}/`, form);
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

  if (loading) return <p>Carregando item para edição...</p>;

  return (
    <main>
      <Title>Editar Item</Title>
      <div className="item-form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <Dropdown
              label="Template do Item"
              value={form.typeSquare} // usa o tipo atual do form
              onChange={(value) => handleChange("typeSquare", value)} // atualiza o form.typeSquare
              options={templateOptions}
              className="dropdown-template-style"
            />
            <Input placeholder="Nome do Item" value={form.nameSquare} onChange={(v) => handleChange("nameSquare", v)} />
            <Input placeholder="Tag (para busca)" value={form.tagSquare} onChange={(v) => handleChange("tagSquare", v)} />

            <TemplateRenderer template={form.typeSquare} form={form} handleChange={handleChange} />
            <Spacer size={20} />

            {/* Campo de cor igual ao create */}
            <Input placeholder="Valor (pips)" type="number" value={form.worthSquare} onChange={(v) => handleChange("worthSquare", +v)} />
            <div className="color-input-wrapper">
              <label className="color-label">Cor Predominante</label>
              <div className="color-field">
                <input type="color" value={form.colorSquare} onChange={(e) => handleChange("colorSquare", e.target.value)} />
                <input
                  type="text"
                  value={form.colorSquare}
                  onChange={(e) => handleChange("colorSquare", e.target.value)}
                  placeholder="#c4a68a"
                />
                <div className="color-preview" style={{ backgroundColor: form.colorSquare }} />
              </div>
            </div>

            <Spacer size={20} />

            <Input placeholder="URL da Imagem" value={form.imageSquare} onChange={(v) => handleChange("imageSquare", v)} />
            <Spacer size={25} />

            <button type="submit" className="bg-blue-600 px-6 py-3 rounded text-white font-bold hover:bg-blue-700">
              Atualizar Item
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
