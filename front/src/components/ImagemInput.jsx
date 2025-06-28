"use client";

import "./styles/ImagemInput.css";

export default function ImageInput({ onChange ,label}) {
  return (
    <label className="image-input-label">
      <span className="image-input-button">{label}</span>
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="image-input-hidden"
      />
    </label>
  );
}
