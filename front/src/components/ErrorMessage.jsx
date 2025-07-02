import React from 'react';
import '../components/styles/Errormensage.css';

export default function ErrorMessage({ children }) {
  return <div className="error-message">{children}</div>;
}
