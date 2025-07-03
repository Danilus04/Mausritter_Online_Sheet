import Button from "./ui/Button";

export default function ExportButton({ item, onClose }) {
  const handleExport = () => {
    onClose();
    if (!item) {
      alert("Nenhum item selecionado.");
      return;
    }

    const json = JSON.stringify(item, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${item.nameSquare || "item"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return <Button className="menu-button" label="Exportar" onClick={handleExport} />;
}
