import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../apiAcess";
import "./styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("Tentando login...");

    try {
      const response = await api.post("api/token/", { username, password });
      if (response.status === 200) {
        // Salve o token no localStorage ou context
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        setMessage(`Sucesso! Bem-vindo(a), ${username}!`);
        setTimeout(() => {
          navigate("/ficha");
        }, 1000);
      } else {
        setMessage(`Erro: ${response.data.detail || response.data.message}`);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(`Erro: ${error.response.data.detail || error.response.data.message}`);
      } else {
        setMessage("Não foi possível conectar ao servidor. Tente novamente mais tarde.");
      }
    }
  };

  return (
    <div className="container">
      <h2>Login para o Gerenciador de Fichas de Mausritter</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formGroup">
          <label htmlFor="username" className="label">
            Nome de Usuário:
          </label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="input" />
        </div>
        <div className="formGroup">
          <label htmlFor="password" className="label">
            Senha:
          </label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="input" />
        </div>
        <button type="submit" className="button">
          Entrar
        </button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Login;
