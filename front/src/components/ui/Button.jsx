export default function Button({ label = "Salvar", onClick, type = "submit", className = "" }) {
  return (
    <div className="submit-button-container">
      <button type={type} className={`${className}`} onClick={onClick}>
        {label}
      </button>
    </div>
  );
}
