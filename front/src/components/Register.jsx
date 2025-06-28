// src/Register.js
import { useState } from 'react';
import api from '../apiAcess';
import './styles/Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      if (response.data.access) {
        localStorage.setItem('access', response.data.access);
        localStorage.setItem('refresh', response.data.refresh);
      }

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
  };

  return (
    <div className="container">
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="email" className="label">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>
        <div className="form-group">
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
        <div className="form-group">
          <label htmlFor="password2" className="label">Confirme a Senha:</label>
          <input
            type="password"
            id="password2"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
            className="input"
          />
        </div>
        <button type="submit" className="button">Cadastrar</button>
      </form>

      {message && <p className="successMessage">{message}</p>}
      {error && <p className="errorMessage">{error}</p>}
    </div>
  );
}

export default Register;
