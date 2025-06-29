import "../styles/Dropdown.css";

/**
 * Componente de Dropdown robusto com validações internas.
 */
export default function Dropdown({
  label = "", // Garante que o label seja sempre uma string
  value,
  onChange = () => {}, // Garante que onChange seja sempre uma função
  options = [], // Garante que options seja sempre um array
  placeholder,
  className = "", // Garante que className seja sempre uma string
}) {
  // Gera um ID único de forma segura
  const selectId = `dropdown-${String(label).replace(/\s+/g, "-").toLowerCase()}`;

  // Validação principal: Se 'options' não for um array, não renderiza o componente
  // e avisa sobre o erro no console.
  if (!Array.isArray(options)) {
    console.error(`[Erro no Dropdown com label: "${label}"] a prop 'options' deve ser um array, mas recebeu:`, options);
    return null; // Impede a quebra do componente
  }

  return (
    <div className={`dropdown-container ${className}`}>
      <label htmlFor={selectId} className="dropdown-label">
        {label}
      </label>
      <select id={selectId} value={value} onChange={(e) => onChange(e.target.value)} className="dropdown-select">
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {/* Mapeia as opções de forma segura */}
        {options.map((option, index) => {
          // Pula qualquer item inválido dentro do array de opções
          if (!option || typeof option.value === "undefined" || typeof option.label === "undefined") {
            console.warn(`[Aviso no Dropdown com label: "${label}"] Opção inválida no índice ${index}.`, option);
            return null;
          }
          return (
            <option key={`${label}-opt-${option.value}-${index}`} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
