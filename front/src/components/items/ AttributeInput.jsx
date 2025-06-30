import React from 'react';
import '../styles/AttributeInput.css';

export default function AttributeInput({ label, current, max, onChangeCurrent, onChangeMax }) {
  return (
    <li className="attribute-input">
      <span className="attribute-label">{label}:</span>
      <input
        type="number"
        value={current ?? ''}
        onChange={(e) => onChangeCurrent(Number(e.target.value))}
        className="attribute-field"
      />
      <span>/</span>
      <input
        type="number"
        value={max ?? ''}
        onChange={(e) => onChangeMax(Number(e.target.value))}
        className="attribute-field"
      />
    </li>
  );
}
