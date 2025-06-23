"use client";
import "./SubmitButton.css";

export default function SubmitButton({ label = "Salvar", onClick, type = "submit" }) {
  return (
    <div className="submit-button-container">
      <button type={type} className="submit-button" onClick={onClick}>
        {label}
      </button>
    </div>
  );
}
