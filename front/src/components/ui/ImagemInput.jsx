// front/src/components/ImagemInput.jsx
"use client";

import { useEffect, useState } from "react"; // Importe useState e useEffect
import "../styles/ImagemInput.css";

export default function ImageInput({ onChange, label }) {
  const [previewImage, setPreviewImage] = useState(null); // Estado para armazenar o URL da imagem

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Cria um URL temporário para a pré-visualização da imagem
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      // Passa o objeto File para a função onChange do componente pai
      onChange(file);
    } else {
      setPreviewImage(null); // Limpa a pré-visualização se nenhum arquivo for selecionado
      onChange(null); // Notifica o pai que nenhum arquivo foi selecionado
    }
  };

  // Efeito para revogar o URL do objeto quando o componente for desmontado
  // ou quando uma nova imagem for selecionada, evitando vazamento de memória.
  useEffect(() => {
    return () => {
      if (previewImage) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]); // Executa a limpeza sempre que previewImage mudar

  return (
    <div className="image-input-container">
      {" "}
      {/* Container para agrupar o label e a miniatura */}
      <label className="image-input-label">
        <span className="image-input-button">{label}</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange} // Usa a nova função de tratamento de mudança
          className="image-input-hidden"
        />
      </label>
      {/* Renderiza a miniatura apenas se houver uma imagem para pré-visualizar */}
      {previewImage && (
        <div className="image-preview-wrapper">
          <img src={previewImage} alt="Pré-visualização da imagem" className="image-preview" />
        </div>
      )}
    </div>
  );
}
