import api from "../apiAcess";
import "./styles/Button.css"; // certifique-se de importar o CSS
import Button from "./ui/Button";

export default function ImportButton({ onSuccess }) {
  const handleImport = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const jsonContent = JSON.parse(e.target.result);
          if (!jsonContent.nameSquare || !jsonContent.widthSquare || !jsonContent.heightSquare) {
            alert("JSON inválido.");
            return;
          }

          const payload = {
            nameSquare: jsonContent.nameSquare || "Item sem nome",
            widthSquare: jsonContent.widthSquare || 1,
            heightSquare: jsonContent.heightSquare || 1,
            descriptionSquare: jsonContent.descriptionSquare || "",
            effectDescription: jsonContent.effectDescription || "",
            typeSquare: jsonContent.typeSquare || "",
            imageSquare: jsonContent.imageSquare || null,
            worthSquare: jsonContent.worthSquare || 0,
            currentUsageSquare: jsonContent.currentUsageSquare || 0,
            maxUsageSquare: jsonContent.maxUsageSquare || 0,
            tagSquare: jsonContent.tagSquare || 0,
            damage1Square: jsonContent.damage1Square || 0,
            damage2Square: jsonContent.damage2Square || 0,
            valueArmorSquare: jsonContent.valueArmorSquare || 0,
            conditionEffectSquare: jsonContent.conditionEffectSquare || 0,
            usageTypeSquare: jsonContent.usageTypeSquare || 0,
            isMagical: jsonContent.isMagical || false,
            pesoSquare: jsonContent.pesoSquare || 0,
          };

          const response = await api.post("item/", payload);
          if (response.status === 201) {
            alert("Item importado com sucesso!");
            onSuccess();
          } else {
            alert(`Erro: ${response.statusText}`);
          }
        } catch (err) {
          alert("Erro ao ler o arquivo.");
        }
      };
      reader.readAsText(file);
    };
    fileInput.click();
  };

  return (
    <div className="import-button-spacing">
      <Button label="Importar Item" onClick={handleImport} />
    </div>
  );
}
