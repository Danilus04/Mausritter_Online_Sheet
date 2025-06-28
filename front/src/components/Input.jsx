import "./styles/Input.css";

function Input({ label, value, onChange, type = "text", placeholder = "" }) {
  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="custom-input"
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
