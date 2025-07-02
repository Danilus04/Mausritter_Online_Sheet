import "../styles/Input.css";

// Adicionamos as props 'as' e 'className'
function Input({ label, value, onChange, type = "text", placeholder = "", as, className = "" }) {
  // Combina a classe padrão do container com qualquer classe customizada vinda da prop
  const containerClasses = `input-container ${className}`;

  // Se a prop 'as' for 'textarea', renderizamos uma área de texto
  if (as === "textarea") {
    return (
      <div className={containerClasses}>
        {(label || placeholder) && <label className="input-label">{label || placeholder}</label>}
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="custom-input" // Mantém a mesma classe do input para consistência
          placeholder={placeholder}
        />
      </div>
    );
  }

  // Caso contrário, renderizamos o input padrão que você já tinha
  return (
    <div className={containerClasses}>
      {(label || placeholder) && <label className="input-label">{label || placeholder}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => {
          const val = type === "number" && e.target.value !== "" ? +e.target.value : e.target.value;
          onChange(val);
        }}
        className="custom-input"
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
