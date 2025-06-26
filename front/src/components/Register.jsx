// src/Register.js
import React, { useState } from 'react';
import api from '../apiAcess';
import './Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o recarregamento da página

    setMessage('');
    setError('');

    if (password !== password2) {
      setError('As senhas não conferem.');
      return;
    }

     try {
    const response = await api.post('register/', {
      username,
      email,
      password,
      password2,
    });

    setMessage('Cadastro realizado com sucesso! Você pode fazer login agora.');
    setUsername('');
    setEmail('');
    setPassword('');
    setPassword2('');
  } catch (err) {
    if (err.response && err.response.data) {
      const data = err.response.data;
      setError(
        data.username
          ? `Usuário: ${data.username}`
          : data.email
          ? `Email: ${data.email}`
          : data.password
          ? `Senha: ${data.password}`
          : JSON.stringify(data)
      );
    } else {
      setError('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
    }
    }

      
  }

  return (
    <div style={styles.container}>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>Nome de Usuário:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password2" style={styles.label}>Confirme a Senha:</label>
          <input
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Cadastrar</button>
      </form>

      {message && <p style={styles.successMessage}>{message}</p>}
      {error && <p style={styles.errorMessage}>{error}</p>}
    </div>
  );
}


export default Register;