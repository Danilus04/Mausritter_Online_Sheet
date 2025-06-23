import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage('Tentando login...');

    try {
      const response = await fetch('http://localhost:8000/app/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Sucesso! ${data.message} Bem-vindo(a), ${username}!`);
        setTimeout(() => {
          navigate('/ficha');
        }, 1000);
      } else {
        setMessage(`Erro: ${data.error || data.message}`);
      }
    } catch (error) {
      console.error('Erro ao conectar com o backend:', error);
      setMessage('Não foi possível conectar ao servidor. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="container">
      <h2>Login para o Gerenciador de Fichas de Mausritter</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formGroup">
          <label htmlFor="username" className="label">Nome de Usuário:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password" className="label">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="button">Entrar</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Login;