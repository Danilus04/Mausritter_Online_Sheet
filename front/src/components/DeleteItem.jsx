import Button from "./ui/Button";

export default function DeleteButton({ item, onDelete, onClose }) {
  const handleDelete = () => {
    onDelete(item);
    onClose();
  };

  return <Button label="Deletar" onClick={handleDelete} />;
}
