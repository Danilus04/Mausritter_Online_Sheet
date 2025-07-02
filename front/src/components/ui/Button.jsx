"use client";
import "../styles/Button.css";

export default function Button({ label = "Salvar", onClick, type = "submit" }) {
  return (
    <div className="submit-button-container">
      <button type={type} className="submit-button" onClick={onClick}>
        {label}
      </button>
    </div>
  );
}
