"use client";
import "./CheckBoxInput.css";

export default function CheckboxInput({ label, checked, onChange }) {
  return (
    <label className="checkbox-label">
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
      />
      <span className="checkbox-text">{label}</span>
    </label>
  );
}
